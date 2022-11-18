import express from "express";
import userRouter from "./routes/user";
import stickersRouter from "./routes/stickers";
import albumRouter from "./routes/album";
import swipeRouter from "./routes/swipe";
import messagesRouter from "./routes/messages";
import regionsRouter from "./routes/regions";
import db from "./models";
import { createQatarStickerList } from "./scripts/createStickers";
const Album = require("./models/album");

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

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("createChat", (chatName, user1, user2) => {
    socket.join(chatName);
    chatList.unshift({
      id: generateID(),
      chatName,
      messages: [],
      users: [user1, user2],
    });

    socket.emit("chatList", chatList);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });

  socket.on("findChat", (id) => {
    let result = chatList.filter((chat) => chat.id == id);
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

    socket.emit("chatList", chatList);
    socket.emit("foundChat", result[0]?.messages);
  });
});

app.get("/chats", (req, res) => {
  res.json(chatList);
  console.log("⚡: chatList", chatList);
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
