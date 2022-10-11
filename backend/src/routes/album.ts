import express from "express";
import mongoose from "mongoose";

import auth from "../middleware/auth";
const Album = require("../models/album");
const router = express.Router();

// Get stickers from album
router.get("/", auth, async (req: any, res) => {
  try {
    // find first album by name create if not exist
    const album = await Album.findOne({ name: "Qatar" });
    if (!album) {
      const album = new Album({
        _id: new mongoose.Types.ObjectId(),
        name: "Qatar",
        stickerList: ["Messi", "Ronaldo", "Neymar"],
      });
      await album.save();
    }
    res.send({ album });
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
