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
  const link = `http://localhost:3000/reset_password/${token}/${id}`; 
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
  const { userInfo, otpResponsePhone } = req.body;
  try {
      const phoneNumber = '+91' + userInfo.mobile; 
      const securePassword = await passwordHashing(userInfo.password);
      const isUserEmail = await User.findOne({ email: userInfo.email }); 
      const isUserMobile = await User.findOne({ mobile: userInfo.mobile });
      if (isUserEmail || isUserMobile) {        
        return next(createError(409, "User is Already Exist"));
      } else {
        const userData = new User({
          name:userInfo.name,
          mobile:userInfo.mobile,
          email:userInfo.email,
          password: securePassword,
          role:userInfo.role
        });
        if (phoneNumber === otpResponsePhone) {
          const user = await userData.save();
          res.status(201).json({ message: "Registered Successfully", user });
        } else {
          return next(createError(400, "Can not register the User"));
        }
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
};

const updateProfile = async (req, res, next) => {
  const { id } = req.params; 
  const { name, mobile: enteredMobile, email: enteredEmail } = req.body; 
  let existUserByMobile, existUserByEmail;
  try {
    const isUser = await User.findById(id);
    if (isUser) {
      if (enteredMobile !== isUser.mobile) {
        existUserByMobile = await User.findOne({ mobile: enteredMobile });        
      }
      if (enteredEmail !== isUser.email) {
        existUserByEmail = await User.findOne({ email: enteredEmail });        
      }
      if (existUserByMobile || existUserByEmail) {
        return next(createError(400, 'Entered mobile or email is already exist'));
      } else {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              name: name,
              mobile: enteredMobile,
              email: enteredEmail
            }
          },
          { new: true }
        ); 
        res.status(200).json({ message: 'Updated successfully', updatedUser });
      }
    } else {
      return next(createError(400, "User not found"));
    }
  } catch (error) { console.log(error.message);
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  const { id } = req.params;
  const { password, confirmPassword } = req.body;
  try {
    if (password === confirmPassword) {
      const isUser = await User.findById(id);
      if (isUser) {
        const securePassword = await passwordHashing(password);
        const updatedUser = await User.findByIdAndUpdate(
          { _id: isUser._id },
          { $set: { password: securePassword } },
          { new: true }
        );
        res.status(200).json({ message: "Password has been changed successfully", updatedUser });
      } else {
        return next(createError(400, "User not found"));
      }
    } else {
      return next(createError(400, "Passwords do not match"));
    }
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
  const { password,confirmPassword } = req.body; 
  const { token, id } = req.params; 
  try {
    if (password === confirmPassword) {
      const isUser = await User.findById(id); 
      const isValidUser = jwt.verify(token, process.env.JWT_SECRET); 
      if (isValidUser) {
        const securePassword = await passwordHashing(password);
        const updatedUser = await User.findByIdAndUpdate(
          { _id: isUser._id },
          { $set: { password: securePassword } },
          { new: true }
        ); 
        res.status(200).json({ message: "Password has been changed successfully", updatedUser });
      } else {
        return next(createError(400, "Link Has been expired "));      
      }
    } else {
      return next(createError(400, "Passwords do not match"));
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

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  userRegister, userLogin,
  userProfile, updateProfile,
  changePassword, deleteProfile,
  forgotPassword,resetPassword,
  userLogout,
  getUser
} 