const express = require("express");
const message_route = express.Router();
const messageController = require("../controllers/messageController");

message_route.post('/', messageController.addMessage);
message_route.get('/:chatId', messageController.getMessages);





module.exports = message_route;
