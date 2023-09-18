const express = require("express");
const booking_route = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyUser } = require("../middlewares/authorization");

booking_route.post('/:id/bookings', verifyUser, bookingController.createBooking);

module.exports = booking_route;
