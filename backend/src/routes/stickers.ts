import express from "express";

import auth from "../middleware/auth";
const Sticker = require("../models/stickers");
const router = express.Router();

// Get stickers from album
router.get("/", auth, async (req: any, res) => {
  try {
    console.log(req.user);
    const album = req.user.album;
    res.send({ album });
  } catch (e) {
    res.status(500).send();
  }
});

// Post sticker to album
router.post("/:stickerId", auth, async (req: any, res) => {
  try {
    const stickerId = req.parms.stickerId;
    const sticker = await Sticker.findById(stickerId);
    if (!sticker) {
      return res.status(404).send();
    }
    sticker.count += 1;
    await req.user.save();
    res.send(sticker);
  } catch (e) {
    res.status(500).send();
  }
});

// Delete sticker from album
router.delete("/:stickerId", auth, async (req: any, res) => {
  try {
    const stickerId = req.parms.stickerId;
    const sticker = await Sticker.findById(stickerId);
    if (!sticker) {
      return res.status(404).send();
    }
    if (sticker.count === 0) {
      return res.status(400).send();
    }
    sticker.count -= 1;
    await req.user.save();
    res.send(sticker);
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
