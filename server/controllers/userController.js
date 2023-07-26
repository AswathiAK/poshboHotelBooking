require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');
const createError = require('../middlewares/errorHandling.js');

const passwordHashing = async (password) => {
  try {
    const bcryptSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, bcryptSalt);
    return hashPassword;
  } catch (error) {
    console.log(error.message);
  }
};

const userRegister = async (req, res, next) => {
  const { name, mobile, email, password, role } = req.body; 
  const securePassword = await passwordHashing(password);
  try {
      const isUserEmail = await User.findOne({ email: email }); 
      const isUserMobile = await User.findOne({ mobile: mobile });
      if (isUserEmail || isUserMobile) {        
        return next(createError(409, "User is Already Exist"));
      } else {
        const userData = new User({
          name,
          mobile,
          email,
          password: securePassword,
          role
        });
        const user = await userData.save();
        res.status(201).json({ message: "Registered Successfully", user });
      }    
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  const { email: userEmail, password: userPassword } = req.body;
  try {
    const isUserExist = await User.findOne({ email: userEmail });
    if (!isUserExist) {
      return next(createError(404, "User not found"));
    }
    const isPasswordCorrect = await bcrypt.compare(userPassword, isUserExist.password);
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong Password "));
    }
    const { password, ...otherDetails } = isUserExist._doc;
    jwt.sign(
      { id: isUserExist._id, role: isUserExist.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).cookie('userToken', token).json({ message: "Login Successfull", ...otherDetails });
      }
    );
  } catch (error) {
    next(error);
  }
};

const userProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

const updateProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "You have deleted your Account" });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  userRegister, userLogin,
  userProfile, updateProfile,
  deleteProfile
}