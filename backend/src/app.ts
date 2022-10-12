import express from "express";
const app = express();
const port = 3000;
import userRouter from "./routes/user";
import stickersRouter from "./routes/stickers";
import albumRouter from "./routes/album";
import swipeRouter from "./routes/swipe";
import messagesRouter from "./routes/messages";
import regionsRouter from "./routes/regions";
const Album = require("./models/album");
import db from "./models";
import { createQatarStickerList } from "./scripts/createStickers";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

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

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
