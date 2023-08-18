const Room = require("../models/roomModel.js");
const Hotel = require("../models/hotelModel.js");

//CREATION
const createRoom = async (req, res, next) => { 
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(
        { _id: hotelId },
        { $push: { rooms: savedRoom._id } }
      );
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error); 
  }
};

//UPDATION
const updateRoom = async (req, res, next) => {
  const { id } = req.params;
  try {
      const updatedRoom = await Room.findByIdAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

//DELETION
const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const roomId = req.params.id;
  try {
    await Room.findByIdAndDelete({ _id: roomId });
    try {
      await Hotel.findByIdAndUpdate(
        { _id: hotelId },
        { $pull: { rooms: roomId } }
      );
    } catch (error) {
      next(error);
    }
    res.status(200).json({ message: "Room has been deleted" });
  } catch (error) {
    next(error);
  }
};

//GET ALL 
const getAllRooms = async (req, res, next) => { 
  try {
    const allRooms = await Room.find();
    res.status(200).json(allRooms);
  } catch (error) {
    next(error);
  }
};

//GET SINGLE
const getSingleRoom = async (req, res,next) => {
  const { id } = req.params;
  try {
    const singleRoom = await Room.findById(id); 
    res.status(200).json(singleRoom);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoom, updateRoom,
  deleteRoom, getAllRooms,
  getSingleRoom
}