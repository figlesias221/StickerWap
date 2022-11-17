"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
chatSchema.statics.findAllChatsByUserId = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const chats = yield Chat.find({
            $or: [{ userId1: userId }, { userId2: userId }],
        });
        return chats;
    });
};
chatSchema.statics.getAllChats = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const chats = yield Chat.find();
        console.log("🚀: getAllChats -> chats", chats);
        return chats;
    });
};
chatSchema.statics.AddMessage = function (chatId, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const chat = yield Chat.findById(chatId);
        if (!chat) {
            throw new Error("No chat found");
        }
        chat.messages.push(message);
        yield chat.save();
        return chat;
    });
};
const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
//# sourceMappingURL=chats.js.map