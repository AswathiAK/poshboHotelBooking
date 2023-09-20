const express = require("express");
const booking_route = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyUser } = require("../middlewares/authorization");

booking_route.post('/:id/create-checkout-session',verifyUser, bookingController.createStripeCheckout);
booking_route.post('/:id/book-property', verifyUser, bookingController.createBooking);

module.exports = booking_route;
