const express = require("express");
const user_route = express.Router();
const userController = require('../controllers/userController.js');
const { verifyUser } = require("../middlewares/authorization.js");

user_route.post('/register', userController.userRegister);
user_route.post('/login', userController.userLogin);
user_route.post('/forgot-password', userController.forgotPassword);
user_route.post('/reset-password/:token/:id', userController.resetPassword);
user_route.get('/:id', verifyUser, userController.userProfile);
user_route.put('/:id', verifyUser, userController.updateProfile);
user_route.patch('/:id', verifyUser, userController.changePassword);
user_route.delete('/:id', verifyUser, userController.deleteProfile);
user_route.post('/logout', userController.userLogout); 

user_route.get('/find/:id', userController.getUser);

module.exports = user_route;  