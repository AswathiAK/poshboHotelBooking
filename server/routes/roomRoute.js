const express = require("express");
const room_route = express.Router();
const roomController = require("../controllers/roomController.js");
const { verifyHotel, verifyUserToken } = require("../middlewares/verification.js");

room_route.post('/:hotelId', verifyUserToken, verifyHotel, roomController.createRoom);
room_route.put('/:id', verifyUserToken, verifyHotel, roomController.updateRoom);
room_route.delete('/:id/:hotelId', verifyUserToken, verifyHotel, roomController.deleteRoom);
room_route.get('/', roomController.getAllRooms);
room_route.get('/:id', roomController.getSingleRoom);

module.exports = room_route;
