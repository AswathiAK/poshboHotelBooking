const express = require("express");
const adminController = require("../controllers/adminController.js");
const { verifyAdmin } = require("../middlewares/authorization.js");
const admin_route = express.Router();

admin_route.post('/', adminController.adminLogin);

admin_route.get('/users', verifyAdmin, adminController.usersList);
admin_route.put('/users/:id', verifyAdmin, adminController.updateUser);
admin_route.get('/users/:id', verifyAdmin, adminController.singleUser);
admin_route.delete('/users/:id', verifyAdmin, adminController.deleteUser);
admin_route.post('/users/block/:id', verifyAdmin, adminController.blockUser);

admin_route.get('/hotels', verifyAdmin, adminController.hotelsList);
admin_route.put('/hotels/:id', verifyAdmin, adminController.updateHotel);
admin_route.get('/hotels/:id', verifyAdmin, adminController.singleHotel);
admin_route.delete('/hotels/:id', verifyAdmin, adminController.deleteHotel);
admin_route.post('/hotels/verify/:id', verifyAdmin, adminController.verifyHotel);
admin_route.post('/hotels/block/:id', verifyAdmin, adminController.blockHotel);

admin_route.post('/logout', adminController.adminLogout);

admin_route.get('/bookings', verifyAdmin, adminController.bookingsList);

admin_route.get('/barchart', verifyAdmin, adminController.loadSalesBarChart);
admin_route.get('/piechart', verifyAdmin, adminController.loadStatusPieChart);
admin_route.get('/report', verifyAdmin, adminController.loadSalesReport);
admin_route.get('/earnings', verifyAdmin, adminController.totalEarnings);

module.exports = admin_route; 