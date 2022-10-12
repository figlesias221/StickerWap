import express from "express";

import auth from "../middleware/auth";
const router = express.Router();

router.get("/", auth, async (req: any, res) => {
  try {
    const user = req.user;
    const matches = user.matches;
    res.send(matches);
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
