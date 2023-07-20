const express = require("express");
const adminController = require("../controllers/adminController.js");
const { verifyAdmin } = require("../middlewares/verification.js");
const admin_route = express.Router();

admin_route.post('/', adminController.adminLogin);

admin_route.get('/users', verifyAdmin, adminController.usersList);
admin_route.put('/users/:id', verifyAdmin, adminController.updateUser);
admin_route.get('/users/:id', verifyAdmin, adminController.singleUser);
admin_route.delete('/users/:id', verifyAdmin, adminController.deleteUser);

admin_route.get('/hotels', verifyAdmin, adminController.hotelsList);
admin_route.put('/hotels/:id', verifyAdmin, adminController.updateHotel);
admin_route.get('/hotels/:id', verifyAdmin, adminController.singleHotel);
admin_route.delete('/hotels/:id', verifyAdmin, adminController.deleteHotel);
  
module.exports = admin_route;