require('dotenv').config();
const express = require("express");
const booking_route = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyUser } = require("../middlewares/authorization");

booking_route.post('/:id/create-checkout-session',verifyUser, bookingController.createStripeCheckout);
booking_route.post('/webhook', express.raw({ type: 'application/json' }), bookingController.createWebhook);

// booking_route.post('/:id/book-property', verifyUser, bookingController.createBooking);
booking_route.get('/:id/booked-data', verifyUser, bookingController.bookingDetails);
booking_route.put('/:id/cancel-booking/:bookingId', verifyUser, bookingController.cancelBooking);

module.exports = booking_route;
