const createError = require("../middlewares/errorHandling");
const Message = require("../models/messageModel");

const addMessage = async (req, res, next) => {
  const message = new Message(req.body);
  try {
    const savedMessage = await message.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({
      chatId: chatId,
    });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  addMessage,
  getMessages
};
