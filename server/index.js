require('dotenv').config();
const mongoose = require("mongoose");
mongoose.set('strictQuery',true);

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

//Socket connection establishment
const io = require("socket.io")(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});
let onlineUsers = [];
io.on("connection", (socket) => {
  //add new user
  socket.on("addNewUser", (newUserId) => {
    //if user is not added previously
    if (!onlineUsers.some((user) => user.userId === newUserId)) {
      onlineUsers.push({
        userId: newUserId,
        socketId: socket.id
      });
    }
    console.log("Connected Users", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers);
  });
  //send message 
  socket.on("sendMessage", (message) => {
    const { receiverId, senderId } = message;
    const user = onlineUsers.find((user) => user.userId === receiverId);
    console.log('Message: ', message);
    console.log("Sending from socket to: ", user);
    if (user) {
      io.to(user.socketId).emit("receiveMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: senderId,
        isRead: false,
        date: new Date()
      });
    }
  });
  //typing started indication
  socket.on("typingStarted", () => {
    socket.broadcast.emit("typingStartedFromServer");
  });
  //typing stopped indication
  socket.on("typingStopped", () => {
    socket.broadcast.emit("typingStoppedFromServer");
  });
  //user disconnect
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("User disconnected", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

