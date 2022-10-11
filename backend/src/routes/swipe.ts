import express from "express";

import auth from "../middleware/auth";
const User = require("../models/user");
const Album = require("../models/album");
const router = express.Router();

router.get("/", auth, async (req: any, res) => {
    try {
        const user = req.user;
        const region = user.region;
        let randomSticker
        let user_id
        while (!randomSticker) {
            let users = await User.getRandomUser(region);
            let randomUser = users[Math.floor(Math.random() * users.length)];
            while (randomUser._id == user._id) {
                users = await User.getRandomUser(region);
                randomUser = users[Math.floor(Math.random() * users.length)];
            }
            user_id = randomUser._id;

            randomSticker = randomStickerId(randomUser.album);
            if (user.album[randomSticker] > 0) {
                randomSticker = null;
            }
        }
        
        const album = await Album.findOne({ name: "Qatar" });
        const sticker = album.stickerList[randomSticker];

        res.send({ user_id, randomSticker, sticker });
    } catch (e) {
        res.status(500).send();
    }
});

// when post user_id and sticker_id, add user to user's match list
router.post("/", auth, async (req: any, res) => {
    try {
        const user = req.user;
        const user_id = req.body.user_id;
        const sticker_id = req.body.sticker_id;
        const user2 = await User.findById(user_id);
        if (!user2) {
            return res.status(404).send();
        }
        if (user2.album[sticker_id] > 0) {
            return res.status(400).send();
        }
        user.matches.push(user_id);
        user2.matches.push(user._id);
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

var randomStickerId = function (obj) {
    var keys = Object.keys(obj);
    keys = keys.filter((key) => obj[key] >= 0);
    return keys[Math.floor(keys.length * Math.random())];
};

export default router;
