const express = require("express");
const room_route = express.Router();
const roomController = require("../controllers/roomController.js");
const { verifyHotel, verifyUserToken, verifyUser } = require("../middlewares/authorization.js");

room_route.post('/:id', verifyUserToken, verifyHotel, roomController.createRoom);
room_route.put('/:id/:roomId', verifyUserToken, verifyHotel, roomController.updateRoom);
room_route.delete('/:id/:roomId', verifyUserToken, verifyHotel, roomController.deleteRoom);

room_route.get('/', roomController.getAllRooms);
room_route.get('/:id', roomController.getSingleRoom);

room_route.patch('/:id/:roomNoId', verifyUser, roomController.updateRoomAvailability);

module.exports = room_route;
