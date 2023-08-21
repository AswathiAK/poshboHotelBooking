require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
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

const sendResetPasswordMail = async (id, name, email, token) => {
  const link = `http://localhost:3000/users/reset/${id}/${token}`;
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.SENDEREMAIL,
      pass: process.env.SENDERPASSWORD
    }
  });
  const mailOptions = {
    from: process.env.SENDEREMAIL,
    to: email,
    subject: "Password Reset Request",
    html: `<p>Hi ${name} Please click here to <a href=${link}>Reset your password</a></p>`
  };
  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email has been sent: ", info.response);
    }
  });
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
    } else {
      if (isUserExist.isBlock) {
        return next(createError(401, "Your account has been blocked"));
      } else {
        const { password, ...otherDetails } = isUserExist._doc;
        jwt.sign(
          { id: isUserExist._id, role: isUserExist.role, isBlock:isUserExist.isBlock },
          process.env.JWT_SECRET,
          { expiresIn: "2d" },
          (err, token) => {
            if (err) throw err;
            res.status(200).cookie('userToken', token).json({ message: "Login Successfull", ...otherDetails });
          }
        );
      }      
    }    
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

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const isUserExist = await User.findOne({ email: email });
    if (!isUserExist) {
      return next(createError(404, "User not found"));
    } else {
      const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRET, { expiresIn: "5m" });  
      sendResetPasswordMail(isUserExist._id, isUserExist.name, isUserExist.email, token);
      res.status(200).json({ message: "Please Check your email to reset the Password" });
    }
  } catch (error) {
    next(error);
  }  
};

const resetPassword = async (req, res, next) => {
  const { newPassword } = req.body;
  const { id, token } = req.params;
  try {
    const isUser = await User.findById(id);
    const isValidUser = jwt.verify(token, process.env.JWT_SECRET);
    if (isValidUser) {
      const securePassword = await passwordHashing(newPassword);
      const updatedUser = await User.findByIdAndUpdate(
        { id: isUser._id },
        { $set: { password: securePassword } },
        { new: true }
      );
      res.status(200).json({ message: "Password has been changed successfully" });
    } else {
      return next(createError(400, "Link Has been expired "));      
    }
  } catch (error) {
    next(error);
  }
};

const userLogout = async (req, res, next) => {
  try {
    res.status(200).cookie('userToken', '').json({message:"Logout successfully"});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegister, userLogin,
  userProfile, updateProfile,
  deleteProfile,
  forgotPassword,resetPassword,
  userLogout 
} 