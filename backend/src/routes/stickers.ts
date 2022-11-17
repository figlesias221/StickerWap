import express from "express";

import auth from "../middleware/auth";
const router = express.Router();
router.get("/", auth, async (req: any, res) => {
  try {
    const album = req.user.album;
    res.send({ album });
  } catch (e) {
    res.status(500).send();
  }
});

// Post sticker to album
router.post("/:id", auth, async (req: any, res) => {
  try {
    const stickerId = req.params.id;
    const album = req.user.album;
    album[stickerId] = album[stickerId] + 1;
    req.user.markModified("album");
    await req.user.save();
    res.send(album);
  } catch (e) {
    res.status(500).send();
  }
});

// Delete sticker from album
router.delete("/:id", auth, async (req: any, res) => {
  try {
    const stickerId = req.params.id;
    const album = req.user.album;
    if (!album) {
      return res.status(404).send();
    }
    if (album[stickerId] === 0) {
      return res.status(400).send();
    }
    album[stickerId] -= 1;
    req.user.markModified("album");
    await req.user.save();
    res.send(album);
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
