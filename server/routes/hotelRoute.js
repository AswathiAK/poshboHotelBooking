const express = require("express");
const hotel_route = express.Router();
const hotelController = require('../controllers/hotelController.js');
const { isUserHost, verifyUserToken, verifyHotel } = require("../middlewares/authorization.js");

hotel_route.post('/', isUserHost, hotelController.createHotel); 
hotel_route.put('/:id', verifyUserToken, verifyHotel, hotelController.updateHotel);
hotel_route.delete('/:id', verifyUserToken, verifyHotel, hotelController.deleteHotel);
hotel_route.get('/:hostId', verifyUserToken, hotelController.hotelsOfHost);
hotel_route.get('/:hostId/:id', verifyUserToken, verifyHotel, hotelController.singleHotelOfHost);

hotel_route.get('/', hotelController.getAllHotels);
hotel_route.get('/:id', hotelController.getSingleHotel);

module.exports = hotel_route; 