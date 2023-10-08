const Review = require("../models/reviewModel.js");
const User = require("../models/userModel.js");
const Hotel = require("../models/hotelModel.js");
const Booking = require("../models/bookingModel.js");
const createError = require("../middlewares/errorHandling.js");

//Create review
const addReview = async (req, res, next) => {
  const { id, hotelId } = req.params;
  const { rating, title, comment } = req.body;
  try {
    const booking = await Booking.findOne({ user: id, hotel: hotelId, bookingStatus: 'checkedIn' });
    if (!booking) {
      return next(createError(400, "You can not review this hotel since you have n't stayed here"));
    }
    const existingReview = await Review.findOne({ hotel: hotelId, user: id });
    if (existingReview) {
      return next(createError(400, "You have already reviewed this hotel"));
    } else {
      const review = new Review({
        hotel: hotelId,
        user: id,
        rating, 
        reviewTitle: title,
        comment
      });
      const addedReview =await review.save(); 
      await Hotel.updateOne(
        { _id: hotelId },
        { $push: { reviews: addedReview._id } }
      );
      res.status(200).json({ message: 'Review added successfully', addedReview });
    }
  } catch (error) {
    next(error);
  }
};

//Update review
const editReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const { rating, title, comment } = req.body;
  try { 
    const updatedReview = await Review.findByIdAndUpdate(
      { _id: reviewId },
      {
        $set: {
          rating,
          reviewTitle: title,
          comment
        }
      },
      { new: true }
    );
    res.status(200).json({ message: 'Review updated successfully', updatedReview });
  } catch (error) {
    next(error);
  }
};
//delete review
const deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findById({ _id: reviewId });
    if (!review) {
      return next(createError(404, "Review not found"));
    }
    await Review.findByIdAndDelete({ _id: reviewId });
    await Hotel.updateOne(
      { _id: review.hotel },
      { $pull: { reviews: reviewId } }
    );
    res.status(200).json({ message: 'Review deleted successfylly' });
  } catch (error) {
    next(error);
  }
};

//Get all reviews of user
const allReviewsOfUser = async (req, res, next) => {
  const { id: userId } = req.params;
  try {
    const reviews = await Review.find({ user: userId }).populate('hotel');
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

const getSingleReview = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const singleReview = await Review.findById({ _id: reviewId });
    res.status(200).json(singleReview);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReview, editReview,
  deleteReview,
  allReviewsOfUser,
  getSingleReview
}