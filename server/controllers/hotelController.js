const Hotel = require("../models/hotelModel.js");
const cloudinary = require("../middlewares/cloudinary.js");
const Room = require("../models/roomModel.js");
const Booking = require("../models/bookingModel.js");
const { ObjectId } = require("mongodb");
const createError = require("../middlewares/errorHandling.js");
const Review = require("../models/reviewModel.js");
const moment = require('moment');

//CREATION
const createHotel = async (req, res, next) => {   
  const { name, type, title,
    city, address, description,
    extraInfo,
    checkInTime, checkOutTime,
    cheapestPrice,perks,
    documentProof, photos,
    rooms,
    isVerified, isBlock } = req.body;   
  try {    
    const documentProofUrl = await cloudinary.uploader.upload(documentProof, {
      upload_preset: 'poshbo_uploads',
      allowed_formats:['jpg','jpeg','png','webp']
    });    
    const photosPromise = photos.map((photo) => {
      return cloudinary.uploader.upload(photo, {
        upload_preset: 'poshbo_uploads',
        allowed_formats: ['jpg', 'jpeg', 'png','webp']
      });
    });
    const photosUrl = await Promise.all(photosPromise);   
    const photosList = photosUrl.map((photo) => {
      return photo.url;
    });    
    const newHotel = new Hotel({
      owner: req.user.id,
      name, type, title,
      city, address, description,   
      extraInfo,
      checkInTime, checkOutTime,
      cheapestPrice,perks,
      documentProof:documentProofUrl.url,
      photos:photosList,
      rooms,
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
  const { name, type, title,
    city, address, description,
    extraInfo,
    checkInTime, checkOutTime,
    cheapestPrice,perks,
    documentProof, photos,
  } = req.body;      
  try {
    let documentProofUrl;
    if (typeof (documentProof) === 'string' && documentProof.startsWith('http://res.cloudinary.com')) { 
      documentProofUrl = documentProof;      
    } else {console.log('baset4tsgasanalloo');
      const {url} = await cloudinary.uploader.upload(documentProof, {
        upload_preset: 'poshbo_uploads',
        allowed_formats:['jpg','jpeg','png','webp']
      });
      documentProofUrl = url;
    }
    const photosPromise = photos.map(async (photo) => {
      if (typeof photo === 'string' && photo.startsWith('http://res.cloudinary.com')) {
        return photo;
      } else {
        const {url}=await cloudinary.uploader.upload(photo, {
          upload_preset: 'poshbo_uploads',
          allowed_formats: ['jpg', 'jpeg', 'png','webp']
        });
        return url;
      }
    });
    const photosUrl = await Promise.all(photosPromise);      
    const updatedHotel = await Hotel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {          
          name, type, title,
          city, address, description,   
          extraInfo,
          checkInTime, checkOutTime,
          cheapestPrice,perks,
          documentProof:documentProofUrl,
          photos:photosUrl,          
        }
      },
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
    const singleHotel = await Hotel.findById(id).populate('rooms'); 
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
    ).populate('reviews');
    res.status(200).json(allHotels);
  } catch (error) {
    next(error);
  }
};
//GET SINGLE for user
const getSingleHotel = async (req, res, next) => {
  const { id } = req.params; 
  try {
    const singleHotel = await Hotel.findById(id).populate('owner').populate('rooms'); 
    const reviews = await Review.find({ hotel: id }).populate('user');
    singleHotel.reviews = reviews; 
    res.status(200).json(singleHotel); 
  } catch (error) {
    next(error);
  }
};

const searchHotelsResults = async (req, res, next) => {
  const city = req.query.city || '';
  try {
    const searchHotels = await Hotel.find({
      $and: [
        { isVerified: true },
        { isBlock: false }
      ],
      $or: [
        { city: { $regex: city, $options: "i" } },
        { address: { $regex: city, $options: "i" } },
      ]
    });
    if (searchHotels.length === 0) {
      return res.status(404).json({ message: "Oops!, No hotels found" });
    }
    res.status(200).json(searchHotels);
  } catch (error) {
    next(error);
  }
};

//originalbookingslist
const hotelBookingsList = async (req, res, next) => {
  const { id: hotelId } = req.params;
  try {
    const pipeline = [
      { $match: { hotel: new ObjectId(hotelId) } },
      {
        $lookup: {
          from: "rooms",
          localField: "selectedRooms",
          foreignField: "roomNumbers._id", 
          as: "roomDetails",
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as:'userDetails'
        }
      }
    ];
    const bookingDetails = await Booking.aggregate(pipeline); 
    res.status(200).json(bookingDetails);
  } catch (error) {
    next(error);
  }
};

const todaysHotelBookingsList = async (req, res, next) => {
  const { id: hotelId } = req.params;
  const today = moment().format('DD/MM/YYYY');
  try {
    const pipeline = [
      { $match: { hotel: new ObjectId(hotelId) } },
      {
        $lookup: {
          from: "rooms",
          localField: "selectedRooms",
          foreignField: "roomNumbers._id",
          as: "roomDetails",
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as:'userDetails'
        }
      },
      {
        $addFields: {
          checkInDateFormatted: {
            $dateToString: {
              format: '%d/%m/%Y',
              date: '$checkInDate',
              timezone: 'UTC'
            }
          }
        }
      },
      {
        $match: { checkInDateFormatted: today } 
      }
    ];
    const todaysBooking = await Booking.aggregate(pipeline);
    res.status(200).json(todaysBooking);
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  const { bookingId } = req.params;  
  const { status } = req.body; 
  try {
    const bookingData = await Booking.findOne({ _id: bookingId });
    if (!bookingData) {
      return next(createError(404, "Booking not found"));
    }
    const updatedBooking = await Booking.findByIdAndUpdate(
      { _id: bookingId },
      { $set: { bookingStatus: status } },
      { new: true }
    );
    if (updatedBooking.status === 'notCheckedIn') {
      const selectedRooms = updatedBooking.selectedRooms;
      await Promise.all(selectedRooms.map(async (room) => {
        const unAvailableRooms = await Room.updateOne(
          { "roomNumbers._id": room },
          { 
            $pull: {
              "roomNumbers.$.unAvailableDates": {
                $gte: updatedBooking.checkInDate,
                $lte: updatedBooking.checkOutDate
              }
            }
          }
        );
        return unAvailableRooms;
      }));
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};

const getHotelReviews = async (req, res, next) => {
  const { hotelId } = req.params;
  try {
    const reviews = await Review.find({ hotel: hotelId }).populate('user');
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

const hotelEarnings = async (req, res, next) => {
  const { id: hotelId } = req.params;
  let commissionPercentage = 5;
  try {
    const bookings = await Booking.find({
      hotel: hotelId,
      bookingStatus: { $in: ["checkedIn", "notCheckedIn"] }
    });
    if (bookings.length > 0) {
      const earningsDetails = bookings.map(booking => {
        const { _id, bookingStatus, totalAmount } = booking;
        const commission = totalAmount * commissionPercentage / 100;
        const earnings = totalAmount - commission;
        return { _id, bookingStatus, totalAmount, commission, earnings };
      });
      res.status(200).json(earningsDetails);
    } else {
      return res.status(404).json({ message: "No bookings found and so the earnings" });
    } 
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHotel, updateHotel,
  deleteHotel,
  hotelsOfHost,singleHotelOfHost,
  getAllHotels, getSingleHotel,
  searchHotelsResults,
  hotelBookingsList,todaysHotelBookingsList,
  updateBookingStatus,
  getHotelReviews,
  hotelEarnings
}