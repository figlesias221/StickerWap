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
const http = require("http").Server(app);
const cors = require("cors");
app.use(express_1.default.json());
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
        var _a;
        let result = chatList.filter((chat) => chat.id == id);
        socket.emit("foundChat", (_a = result[0]) === null || _a === void 0 ? void 0 : _a.messages);
    });
    socket.on("newMessage", (data) => {
        var _a;
        const { chat_id, message, user, timestamp } = data;
        console.log("⚡: user -> data", user);
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
        socket.emit("foundChat", (_a = result[0]) === null || _a === void 0 ? void 0 : _a.messages);
    });
});
app.get("/chats", (req, res) => {
    res.json(chatList);
    console.log("⚡: chatList", chatList);
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