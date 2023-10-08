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
const roomRoute = require('./routes/roomRoute.js');
const bookingRoute = require('./routes/bookingRoute.js');
const reviewRoute = require('./routes/reviewRoute.js');
const chatRoute = require('./routes/chatRoute.js');
const messageRoute = require('./routes/messageRoute.js');

const app = express();
const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => {
  res.send("BackEnd is Running");
});

//Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));
app.use(express.json({limit:"500mb"}));
app.use(cookieParser());
app.use(express.static('public'));  
app.use(express.urlencoded({ extended: true, limit:"500mb" }));


//Routes
app.use('/users', userRoute);
app.use('/admin', adminRoute);
app.use('/hotels', hotelRoute);
app.use('/rooms', roomRoute);
app.use('/bookings', bookingRoute);
app.use('/reviews', reviewRoute);
app.use('/chats', chatRoute);
app.use('/messages', messageRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  });
});
const server = app.listen(PORT, () => {
  connect();
  console.log(`Server is Running on http://localhost:${PORT}`);
});



const io = require("socket.io")(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});
let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
}; 
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => { 
  const receive = users.find((user) => user.userId === userId); 
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId); 
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });
  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});



