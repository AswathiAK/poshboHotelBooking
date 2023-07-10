const express = require("express");
const user_route = express.Router();
const userController = require('../controllers/userController');

user_route.post('/register', userController.userRegister);

module.exports = user_route;