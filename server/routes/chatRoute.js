const express = require("express");
const chat_route = express.Router();
const chatController = require("../controllers/chatController");

chat_route.post('/', chatController.createChat);
chat_route.get('/:userId', chatController.getChats);

module.exports = chat_route; 