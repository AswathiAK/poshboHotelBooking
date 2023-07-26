const express = require("express");
const hotel_route = express.Router();
const hotelController = require('../controllers/hotelController.js');
const { verifyHotel } = require("../middlewares/verification.js");

hotel_route.post('/', verifyHotel, hotelController.createHotel); 
hotel_route.put('/:id', verifyHotel, hotelController.updateHotel);
hotel_route.delete('/:id', verifyHotel, hotelController.deleteHotel);
hotel_route.get('/', hotelController.getAllHotels);
hotel_route.get('/:id', hotelController.getSingleHotel);

module.exports = hotel_route;