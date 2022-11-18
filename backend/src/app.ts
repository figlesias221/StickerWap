import express from "express";
import userRouter from "./routes/user";
import stickersRouter from "./routes/stickers";
import albumRouter from "./routes/album";
import swipeRouter from "./routes/swipe";
import messagesRouter from "./routes/chats";
import regionsRouter from "./routes/regions";
import db from "./models";
import { createQatarStickerList } from "./scripts/createStickers";
import console from "console";
import mongoose from "mongoose";
const Album = require("./models/album");
const Chat = require("./models/chats");

const app = express();
const port = 3000;
const http = require("http").Server(app);
const cors = require("cors");

app.use(express.json());
app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "<http://localhost:3000>",
  },
});

const generateID = () => Math.random().toString(36).substring(2, 10);
let chatList = [];

socketIO.on("connection", async (socket) => {
  await Chat.getAllChats().then((chatsFromDB) => {
    chatList = chatsFromDB;
  });

  socket.on("createChat", (user1: any, user2: any) => {
    const chat = new Chat({
      _id: new mongoose.Types.ObjectId(),
      messages: [],
      userId1: user1,
      userId2: user2,
    });

    chatList.push(chat);

    let chatListCopy = chatList;

    chat.save();
    socket.emit(
      "foundChatList",
      chatListCopy.filter(
        (chat) => chat.userId1 === user1 || chat.userId2 === user1
      )
    );
  });

  socket.on("findChat", (id) => {
    let result = chatList.filter((chat) => chat._id == id);
    socket.emit("foundChat", result[0]?.messages);
  });

  socket.on("newMessage", (data) => {
    const { chat_id, message, user, timestamp } = data;

    let result = chatList.filter((chat) => chat.id == chat_id);

    const newMessage = {
      id: generateID(),
      text: message,
      user: user,
      time: `${timestamp.hour}:${timestamp.mins}`,
    };

    socket.to(result[0].chatName).emit("chatMessage", newMessage);
    result[0].messages.push(newMessage);
    Chat.AddMessage(chat_id, newMessage);

    socket.emit("foundChat", result[0]?.messages);
    socket.emit(
      "foundChatList",
      chatList.filter((chat) => chat.userId1 === user || chat.userId2 === user)
    );
  });

  socket.on("chatList", (id: any) => {
    socket.emit(
      "foundChatList",
      chatList.filter((chat) => chat.userId1 === id || chat.userId2 === id)
    );
  });

  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Check if Qatar album exist, if not create it
Album.findOne({ name: "Qatar" }, (err, album) => {
  if (err) {
    console.log(err);
  } else if (!album) {
    const album = new Album({
      _id: new db.mongoose.Types.ObjectId(),
      name: "Qatar",
      stickerList: createQatarStickerList(),
    });
    album.save();
  }
});

app.use("/users", userRouter);
app.use("/stickers", stickersRouter);
app.use("/albums", albumRouter);
app.use("/swipe", swipeRouter);
app.use("/messages", messagesRouter);
app.use("/regions", regionsRouter);

http.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

module.exports = app;
