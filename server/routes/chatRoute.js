const express = require("express");
const chat_route = express.Router();
const chatController = require("../controllers/chatController");
const { verifyUserToken } = require("../middlewares/authorization");

chat_route.post('/', verifyUserToken, chatController.createChat);
chat_route.get('/:userId', verifyUserToken, chatController.userChats);
chat_route.get('/find/:firstId/:secondId', verifyUserToken, chatController.findChat);


module.exports = chat_route; 