import express from "express";

const Chat = require("../models/chats");
import auth from "../middleware/auth";
const router = express.Router();

router.get("/", auth, async (req: any, res) => {
  try {
    const user = req.user;
    const chats = await Chat.find({ users: user._id });
    res.send(chats);
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
