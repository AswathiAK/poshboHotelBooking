const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const userRegister = async (req, res) => {
  const { name, mobile, email, password } = req.body;
  try {
    if (name && mobile && email && password) {      
      const isUser = await User.find({$or:[{email:email},{mobile:mobile}]});
      if (isUser) {
        res.status(400).json({ message: "User is Already Exist" });
      } else {
        

      }
    } else {
      res.status(400).json({ message: "All Fields are Required" });
    } 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  userRegister
}