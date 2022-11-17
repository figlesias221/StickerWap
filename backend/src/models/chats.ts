export {};

let mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: { type: String, required: true },
  user: { type: String, required: true },
  time: { type: String, required: true },
});

const chatSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId1: { type: String },
  userId2: { type: String },
  messages: { type: Array(messageSchema), required: true },
});

chatSchema.statics.findAllChatsByUserId = async function (userId) {
  const chats = await Chat.find({
    $or: [{ userId1: userId }, { userId2: userId }],
  });
  return chats;
};

chatSchema.statics.getAllChats = async function () {
  const chats = await Chat.find();

  return chats;
};

chatSchema.statics.AddMessage = async function (chatId, message) {
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new Error("No chat found");
  }
  chat.messages.push(message);
  await chat.save();
  return chat;
};

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
