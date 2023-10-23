const express = require("express");
const message_route = express.Router();
const messageController = require("../controllers/messageController");
const { verifyUserToken } = require("../middlewares/authorization");

message_route.post('/', verifyUserToken, messageController.addMessage);
message_route.get('/:chatId', verifyUserToken, messageController.getMessages);

module.exports = message_route;
