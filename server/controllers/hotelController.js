const Hotel = require("../models/hotelModel.js");
const cloudinary = require("../middlewares/cloudinary.js");

//CREATION
const createHotel = async (req, res, next) => {   
  const { name, type, title,
    city, address, description,
    extraInfo,
    checkInTime, checkOutTime,
    cheapestPrice, documentProof,
    perks, photos, rooms,
    isVerified, isBlock } = req.body;
  try {    
    const newHotel = new Hotel({
      owner: req.user.id,
      name, type, title,
      city, address, description,
      extraInfo,
      checkInTime, checkOutTime,
      cheapestPrice,
      documentProof,
      perks, photos, rooms,
      isVerified, isBlock
    });
    const savedHotel = await newHotel.save();
    res.status(200).json({ message: 'Successfully created the property', savedHotel });
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
      res.status(200).json({message:'Updated successfully',updatedHotel});
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

//GET ALL for Hosts
const hotelsOfHost = async (req, res, next) => {  
  const { hostId } = req.params; 
  try {
    const allHotelsOfHost = await Hotel.find({owner:hostId}); 
    res.status(200).json(allHotelsOfHost);
  } catch (error) {
    next(error);
  }
};
//GET SINGLE for Hosts
const singleHotelOfHost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleHotel = await Hotel.findById(id); 
    res.status(200).json(singleHotel);
  } catch (error) {
    next(error);
  }
};

//GET ALL for Users
const getAllHotels = async (req, res, next) => { 
  try {
    const allHotels = await Hotel.find(
      {
        $and: [
          { isVerified: true },
          {isBlock:false}
        ]
      }
    );
    res.status(200).json(allHotels);
  } catch (error) {
    next(error);
  }
};
//GET SINGLE for user
const getSingleHotel = async (req, res, next) => {
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
  hotelsOfHost,singleHotelOfHost,
  getAllHotels,getSingleHotel
}