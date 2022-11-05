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
let chatRooms = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("createRoom", (roomName) => {
    socket.join(roomName);
    chatRooms.unshift({ id: generateID(), roomName, messages: [] });
    socket.emit("roomsList", chatRooms);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });

  socket.on("findRoom", (id) => {
    let result = chatRooms.filter((room) => room.id == id);
    socket.emit("foundRoom", result[0].messages);
  });

  socket.on("newMessage", (data) => {
    const { room_id, message, user, timestamp } = data;

    let result = chatRooms.filter((room) => room.id == room_id);

    const newMessage = {
      id: generateID(),
      text: message,
      user,
      time: `${timestamp.hour}:${timestamp.mins}`,
    };

    socket.to(result[0].name).emit("roomMessage", newMessage);
    result[0].messages.push(newMessage);

    socket.emit("roomsList", chatRooms);
    socket.emit("foundRoom", result[0].messages);
  });
});

app.get("/rooms", (req, res) => {
  res.json(chatRooms);
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
