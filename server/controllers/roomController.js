const Room = require("../models/roomModel.js");
const Hotel = require("../models/hotelModel.js");

//CREATION
const createRoom = async (req, res, next) => { 
  const hotelId = req.params.id; 
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
    res.status(200).json({message:"Room created successfully",savedRoom});
  } catch (error) {
    next(error); 
  }
};

//UPDATION
const updateRoom = async (req, res, next) => {
  const { roomId } = req.params;
  try {
      const updatedRoom = await Room.findByIdAndUpdate(
        { _id: roomId },
        { $set: req.body },
        { new: true }
      );
    res.status(200).json({ message: "Room updated successfully", updatedRoom });
  } catch (error) {
    next(error);
  }
};

//DELETION
const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.id;
  const roomId = req.params.roomId;
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


const updateRoomAvailability = async (req, res, next) => {
  const { roomNoId } = req.params;
  const { dates } = req.body; 
  try {
    const unAvailableRooms = await Room.updateOne(
      { "roomNumbers._id": roomNoId },
      {
        $push: {
          "roomNumbers.$.unAvailableDates": dates
        }
      }
    );
    res.status(200).json({ message: "Room unavailable dates updated", unAvailableRooms });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createRoom, updateRoom,
  deleteRoom, getAllRooms,
  getSingleRoom,
  updateRoomAvailability
}