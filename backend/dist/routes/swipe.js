"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const User = require("../models/user");
const Album = require("../models/album");
const router = express_1.default.Router();
router.get("/", auth_1.default, async (req, res) => {
    try {
        if (Math.random() > 0.2) {
            res.send(Object.assign(Object.assign({}, (await randomSticker(req))), { ad: null }));
        }
        else {
            const ad = {
                title: "Ad Title",
                description: "Ad Description",
                image: "https://picsum.photos/200/300",
                link: "https://www.google.com",
            };
            res.send({ user_id: null, randomSticker: null, sticker: null, ad });
        }
    }
    catch (e) {
        res.status(500).send();
    }
});
router.post("/", auth_1.default, async (req, res) => {
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
        if (user.matches[user_id]) {
            return res.status(400).send();
        }
        if (!user.matches.includes(user_id)) {
            user.matches.push(user_id);
            user.save();
        }
        await user.save();
        res.send(user.matches);
    }
    catch (e) {
        res.status(500).send();
    }
});
var randomSticker = async function (req) {
    const user = req.user;
    const region = user.region;
    let randomSticker;
    let user_id;
    while (!randomSticker) {
        let users = await User.getRandomUser(region, user._id);
        let randomUser = users[Math.floor(Math.random() * users.length)];
        user_id = randomUser._id;
        randomSticker = randomStickerId(randomUser.album);
        if (user.album[randomSticker] > 0) {
            randomSticker = null;
        }
    }
    const album = await Album.findOne({ name: "Qatar" });
    const sticker = album.stickerList[randomSticker];
    return {
        user_id,
        randomSticker,
        sticker,
        flag: `https://countryflagsapi.com/png/${sticker.category}`,
    };
};
var randomStickerId = function (obj) {
    var keys = Object.keys(obj);
    keys = keys.filter((key) => obj[key] > 1);
    return keys[Math.floor(keys.length * Math.random())];
};
exports.default = router;
//# sourceMappingURL=swipe.js.map