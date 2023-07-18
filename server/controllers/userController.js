const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const passwordHashing = async (password) => {
  try {
    const bcryptSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, bcryptSalt);
    return hashPassword;
  } catch (error) {
    console.log(error.message);
  }
}

const userRegister = async (req, res) => {
  const { name, mobile, email, password } = req.body; 
  const securePassword = await passwordHashing(password);
  try {
    if (name && mobile && email && password) {      
      const isUserEmail = await User.findOne({ email: email }); 
      const isUserMobile = await User.findOne({ mobile: mobile });
      if (isUserEmail || isUserMobile) {        
        res.status(400).json({ message: "User is Already Exist" });
      } else {
        const userData = new User({
          name,
          mobile,
          email,
          password: securePassword
        });
        const user = await userData.save();
        res.status(201).json({ message: "Registered Successfully", user });
      }
    } else {
      res.status(400).json({ message: "All Fields are Required" });
    } 
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};



module.exports = {
  userRegister
}