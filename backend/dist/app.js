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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const stickers_1 = __importDefault(require("./routes/stickers"));
const album_1 = __importDefault(require("./routes/album"));
const swipe_1 = __importDefault(require("./routes/swipe"));
const chats_1 = __importDefault(require("./routes/chats"));
const regions_1 = __importDefault(require("./routes/regions"));
const models_1 = __importDefault(require("./models"));
const createStickers_1 = require("./scripts/createStickers");
const console_1 = __importDefault(require("console"));
const mongoose_1 = __importDefault(require("mongoose"));
const Album = require("./models/album");
const Chat = require("./models/chats");
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
socketIO.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    yield Chat.getAllChats().then((chatsFromDB) => {
        chatList = chatsFromDB;
    });
    socket.on("createChat", (user1, user2) => {
        // Check if chat already exists in DB (user1 and user2 are in the same chat)
        const chatExists = chatList.find((chat) => {
            return ((chat.userId1 === user1 && chat.userId2 === user2) ||
                (chat.userId1 === user2 && chat.userId2 === user1));
        });
        if (!chatExists) {
            const chat = new Chat({
                _id: new mongoose_1.default.Types.ObjectId(),
                messages: [],
                userId1: user1,
                userId2: user2,
            });
            chatList.push(chat);
            chat.save();
        }
        socket.emit("foundChatList", chatList.filter((chat) => chat.userId1 === user1 || chat.userId2 === user1));
    });
    socket.on("findChat", (id) => {
        var _a;
        let result = chatList.filter((chat) => chat._id == id);
        socket.emit("foundChat", (_a = result[0]) === null || _a === void 0 ? void 0 : _a.messages);
    });
    socket.on("newMessage", (data) => {
        var _a;
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
        socket.emit("foundChat", (_a = result[0]) === null || _a === void 0 ? void 0 : _a.messages);
        socket.emit("foundChatList", chatList.filter((chat) => chat.userId1 === user || chat.userId2 === user));
    });
    socket.on("chatList", (id) => {
        socket.emit("foundChatList", chatList.filter((chat) => chat.userId1 === id || chat.userId2 === id));
    });
    socket.on("disconnect", () => {
        socket.disconnect();
    });
}));
models_1.default.mongoose
    .connect(models_1.default.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console_1.default.log("Connected to the database!");
})
    .catch((err) => {
    console_1.default.log("Cannot connect to the database!", err);
    process.exit();
});
// Check if Qatar album exist, if not create it
Album.findOne({ name: "Qatar" }, (err, album) => {
    if (err) {
        console_1.default.log(err);
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
app.use("/messages", chats_1.default);
app.use("/regions", regions_1.default);
http.listen(port, () => {
    return console_1.default.log(`Express is listening at http://localhost:${port}`);
});
module.exports = app;
//# sourceMappingURL=app.js.map