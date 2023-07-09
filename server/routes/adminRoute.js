const express = require("express");
const adminController = require("../controllers/adminController");
const admin_route = express.Router();

admin_route.post('/', adminController.adminLogin);

module.exports = admin_route;