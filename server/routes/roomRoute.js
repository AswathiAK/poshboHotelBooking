const express = require("express");
const room_route = express.Router();
const roomController = require("../controllers/roomController.js");
const { verifyHotel } = require("../middlewares/verification.js");

room_route.post('/:hotelId', verifyHotel, roomController.createRoom);
room_route.put('/:id', verifyHotel, roomController.updateRoom);
room_route.delete('/:id/:hotelId', verifyHotel, roomController.deleteRoom);
room_route.get('/', roomController.getAllRooms);
room_route.get('/:id', roomController.getSingleRoom);

module.exports = room_route;
