require('dotenv').config();
const mongoose = require("mongoose");
mongoose.set('strictQuery',true);
//mongoose.connect("mongodb://127.0.0.1:27017/PoshboHotelBooking");
//mongoose.connect(process.env.MONGODB_URL);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/userRoute.js');
const adminRoute = require('./routes/adminRoute.js');
const hotelRoute = require('./routes/hotelRoute.js');

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send("BackEnd is Running");
});

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
//Routes
app.use('/users', userRoute);
app.use('/admin', adminRoute);
app.use('/hotels', hotelRoute);

app.use((err,req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack:err.stack
  })
})

app.listen(PORT, () => {
  connect();
  console.log(`Server is Running on http://localhost:${PORT}`);
});