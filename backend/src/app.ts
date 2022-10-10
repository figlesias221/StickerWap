const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/user");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

const dbs = require("./models");

dbs.mongoose
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

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
