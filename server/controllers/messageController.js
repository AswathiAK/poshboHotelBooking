const Message = require("../models/messageModel");

const addMessage = async (req, res, next) => {
  const { chatId, senderId, text } = req.body;
  try {
    const message = new Message({
      chatId, senderId, text
    });
    const saveMessage = await message.save();
    res.status(200).json(saveMessage);
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  const { chatId } = req.params; 
  try {
    const messages = await Message.find({chatId:chatId}); 
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addMessage,
  getMessages
};
