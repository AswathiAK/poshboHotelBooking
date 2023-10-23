const Chat = require("../models/chatModel");

const createChat = async (req, res, next) => {
  const { senderId, receiverId } = req.body; 
  try {
    const existingChat = await Chat.findOne({
      members: { $all: [senderId, receiverId] }
    });
    if (existingChat)
      return res.status(200).json(existingChat);
    const newChat = new Chat({
      members: [senderId, receiverId]
    });
    const saveChat = await newChat.save(); 
    res.status(200).json(saveChat);
  } catch (error) {
    next(error);
  }
};

const userChats = async (req, res, next) => {
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

const findChat = async (req, res, next) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] }
    });
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createChat,
  userChats,
  findChat
}