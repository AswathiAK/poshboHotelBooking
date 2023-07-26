const Hotel = require("../models/hotelModel.js");

//CREATION
const createHotel = async (req, res, next) => { 
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error); 
  }
};

//UPDATION
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

//DELETION
const deleteHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Hotel.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Hotel has been deleted" });
  } catch (error) {
    next(error);
  }
};

//GET ALL 
const getAllHotels = async (req, res, next) => { 
  try {
    const allHotels = await Hotel.find({isVerified:true});
    res.status(200).json(allHotels);
  } catch (error) {
    next(error);
  }
};

//GET SINGLE
const getSingleHotel = async (req, res,next) => {
  const { id } = req.params;
  try {
    const singleHotel = await Hotel.findById(id); 
    res.status(200).json(singleHotel);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createHotel, updateHotel,
  deleteHotel,
  getAllHotels,getSingleHotel
}