const Chat = require("../models/chatModel");

// const createChat = async (req, res, next) => {
//   const chat = new Chat({
//     members: [req.body.senderId, req.body.receiverId],
//   });
//   try {
//     const savedChat = await chat.save();
//     res.status(200).json(savedChat);
//   } catch (error) {
//     next(error);
//   }
// };

const createChat = async (req, res, next) => { 
  const { senderId, receiverId } = req.body;
  let chat;
  const existingChat = await Chat.findOne({
    members: [senderId, receiverId]
  });
  if (existingChat) {
    res.status(200).json(existingChat);
  } else {
    chat = new Chat({
      members: [req.body.senderId, req.body.receiverId],
    });
  }  
  try {
    const savedChat = await chat.save();
    res.status(200).json(savedChat);
  } catch (error) {
    next(error);
  }
};

const getChats = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const allChatsOfUser = await Chat.find({
      members: { $in: [userId] },
    });
    res.status(200).json(allChatsOfUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createChat,
  getChats
}