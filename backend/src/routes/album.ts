import express from "express";
import mongoose from "mongoose";

import auth from "../middleware/auth";
const Album = require("../models/album");
const router = express.Router();

router.get("/", auth, async (req: any, res) => {
  try {
    const album = await Album.findOne({ name: "Qatar" });
    res.send({ album });
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
