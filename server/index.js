require('dotenv').config();
const mongoose = require("mongoose");
mongoose.set('strictQuery',true);
//mongoose.connect("mongodb://127.0.0.1:27017/PoshboHotelBooking");
mongoose.connect(process.env.MONGODB_URL);

const express = require("express");
const cors = require("cors");
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send("BackEnd is Running");
});

//Routes
app.use('/', userRoute);
app.use('/admin', adminRoute);

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});