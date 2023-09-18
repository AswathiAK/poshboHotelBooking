require('dotenv').config();
const Booking = require("../models/bookingModel.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//CREATION
const createBooking = async (req, res, next) => {
  
  try {
    
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking
}