import express from "express";
const app = express();
const port = 3000;
import userRouter from "./routes/user";
import stickersRouter from "./routes/stickers";
import albumRouter from "./routes/album";
import db from "./models";

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

app.use("/users", userRouter);
app.use("/stickers", stickersRouter);
app.use("/albums", albumRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
