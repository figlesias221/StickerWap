"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const stickers_1 = __importDefault(require("./routes/stickers"));
const album_1 = __importDefault(require("./routes/album"));
const swipe_1 = __importDefault(require("./routes/swipe"));
const messages_1 = __importDefault(require("./routes/messages"));
const regions_1 = __importDefault(require("./routes/regions"));
const models_1 = __importDefault(require("./models"));
const createStickers_1 = require("./scripts/createStickers");
const Album = require("./models/album");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());
const socketIO = require("socket.io")(http, {
    cors: {
        origin: "<http://localhost:3000>",
    },
});
const generateID = () => Math.random().toString(36).substring(2, 10);
let chatRooms = [
//👇🏻 Here is the data structure of each chatroom
// {
//  id: generateID(),
//  name: "Novu Hangouts",
//  messages: [
//      {
//          id: generateID(),
//          text: "Hello guys, welcome!",
//          time: "07:50",
//          user: "Tomer",
//      },
//      {
//          id: generateID(),
//          text: "Hi Tomer, thank you! 😇",
//          time: "08:50",
//          user: "David",
//      },
//  ],
// },
];
socketIO.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("createRoom", (roomName) => {
        socket.join(roomName);
        //👇🏻 Adds the new group name to the chat rooms array
        chatRooms.unshift({ id: generateID(), roomName, messages: [] });
        //👇🏻 Returns the updated chat rooms via another event
        socket.emit("roomsList", chatRooms);
    });
    socket.on("disconnect", () => {
        socket.disconnect();
        console.log("🔥: A user disconnected");
    });
    socket.on("findRoom", (id) => {
        //👇🏻 Filters the array by the ID
        let result = chatRooms.filter((room) => room.id == id);
        //👇🏻 Sends the messages to the app
        socket.emit("foundRoom", result[0].messages);
    });
    socket.on("newMessage", (data) => {
        //👇🏻 Destructures the property from the object
        const { room_id, message, user, timestamp } = data;
        //👇🏻 Finds the room where the message was sent
        let result = chatRooms.filter((room) => room.id == room_id);
        //👇🏻 Create the data structure for the message
        const newMessage = {
            id: generateID(),
            text: message,
            user,
            time: `${timestamp.hour}:${timestamp.mins}`,
        };
        //👇🏻 Updates the chatroom messages
        socket.to(result[0].name).emit("roomMessage", newMessage);
        result[0].messages.push(newMessage);
        //👇🏻 Trigger the events to reflect the new changes
        socket.emit("roomsList", chatRooms);
        socket.emit("foundRoom", result[0].messages);
    });
});
app.get("/api", (req, res) => {
    res.json(chatRooms);
});
models_1.default.mongoose
    .connect(models_1.default.url, {
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
    }
    else if (!album) {
        const album = new Album({
            _id: new models_1.default.mongoose.Types.ObjectId(),
            name: "Qatar",
            stickerList: (0, createStickers_1.createQatarStickerList)(),
        });
        album.save();
    }
});
app.use("/users", user_1.default);
app.use("/stickers", stickers_1.default);
app.use("/albums", album_1.default);
app.use("/swipe", swipe_1.default);
app.use("/messages", messages_1.default);
app.use("/regions", regions_1.default);
http.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map