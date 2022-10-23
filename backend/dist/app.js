"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const user_1 = __importDefault(require("./routes/user"));
const stickers_1 = __importDefault(require("./routes/stickers"));
const album_1 = __importDefault(require("./routes/album"));
const swipe_1 = __importDefault(require("./routes/swipe"));
const messages_1 = __importDefault(require("./routes/messages"));
const regions_1 = __importDefault(require("./routes/regions"));
const Album = require("./models/album");
const models_1 = __importDefault(require("./models"));
const createStickers_1 = require("./scripts/createStickers");
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(express_1.default.json());
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
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map