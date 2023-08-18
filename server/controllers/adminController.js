require('dotenv').config();
const jwt = require("jsonwebtoken");
const createError = require('../middlewares/errorHandling.js');
const User = require('../models/userModel.js');
const Hotel = require('../models/hotelModel.js');

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;  
  const adminEmail = process.env.ADMINEMAIL;
  const adminPassword = process.env.ADMINPASSWORD;
  try {
    if (email === adminEmail && password === adminPassword) {      
      jwt.sign(
        { userName: adminEmail },
        process.env.JWT_ADMINSECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) throw err;
          res.status(200).cookie('adminToken', token).json({ message: "Login Successfull", adminEmail });
        }
      );
    } else {
      return next(createError(400, "Incorrect Email or Password"));
    }
  } catch (error) {
    next(error);
  }
};

const usersList = async (req, res, next) => {
  try {
    const allUsers = await User.find().select("-password"); 
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
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

const singleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "User account has been deleted" });
  } catch (error) {
    next(error);
  }
};

const blockUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id });
    if (user.isBlock) {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { isBlock: false } },
        { new: true }
      );
      res.status(200).json({ message:"unblocked successfully",newData:updatedUser });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { isBlock: true } },
        { new: true }
      );
      res.status(200).cookie('userToken', '').json({message:"blocked successfully", newData:updatedUser });
    }
  } catch (error) {
    next(error);
  }
};

const hotelsList = async (req, res, next) => {
  try {
    const allHotels = await Hotel.find().populate('owner');
    res.status(200).json(allHotels);
  } catch (error) {
    next(error);
  }
};

const updateHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

const singleHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleHotel = await Hotel.findById(id).populate('owner'); 
    res.status(200).json(singleHotel);
  } catch (error) {
    next(error);
  }
};

const deleteHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Hotel.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Hotel has been deleted" });
  } catch (error) {
    next(error);
  }
};

const verifyHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      { _id: id },
      { $set: {isVerified:true} },
      { new: true }
    );
    res.status(200).json({ message:"Verified successfully", newData:updatedHotel });
  } catch (error) {
    next(error);
  }
};

const blockHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById({ _id: id });
    if (hotel.isBlock) {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        { _id: id },
        { $set: { isBlock: false } },
        { new: true }
      );
      res.status(200).json({ message:"unblocked successfully", newData:updatedHotel });
    } else {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        { _id: id },
        { $set: { isBlock: true } },
        { new: true }
      );
      res.status(200).json({message:"blocked successfully", newData:updatedHotel });
    }
  } catch (error) {
    next(error);
  }
};

const adminLogout = async (req, res, next) => {
  try {
    res.status(200).cookie('adminToken', '').json({ message: "Logout successfully" });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  adminLogin,
  usersList, updateUser, 
  singleUser, deleteUser,
  blockUser,
  hotelsList, updateHotel,
  singleHotel, deleteHotel,
  verifyHotel, blockHotel,
  adminLogout,
};
