const express = require("express");
const user_route = express.Router();
const userController = require('../controllers/userController.js');
const { verifyUser } = require("../middlewares/authorization.js");

// user_route.get('/checkauthentication', verifyToken, (req, res, next) => {
//   res.send("hello user,you are logged in");
// })
// user_route.get('/checkuser/:id',verifyUser, (req, res, next) => {
//   res.send("hello user,you are logged in and you can delete your account");
// })

user_route.post('/register', userController.userRegister);
user_route.post('/login', userController.userLogin);
user_route.post('/forgot-password', userController.forgotPassword);
user_route.post('/reset-password/:token/:id', userController.resetPassword);
user_route.get('/:id', verifyUser, userController.userProfile);
user_route.put('/:id', verifyUser, userController.updateProfile);
user_route.delete('/:id', verifyUser, userController.deleteProfile);
user_route.post('/logout', userController.userLogout); 

module.exports = user_route;  