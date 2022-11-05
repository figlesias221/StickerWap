"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const User = require("../models/user");
const Album = require("../models/album");
const router = express_1.default.Router();
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Math.random() > 0.2) {
            res.send(Object.assign(Object.assign({}, (yield randomSticker(req))), { ad: null }));
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
}));
router.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const user_id = req.body.user_id;
        const sticker_id = req.body.sticker_id;
        const user2 = yield User.findById(user_id);
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
        yield user.save();
        res.send(user.matches);
    }
    catch (e) {
        res.status(500).send();
    }
}));
var randomSticker = function (req) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const region = user.region;
        let randomSticker;
        let user_id;
        while (!randomSticker) {
            let users = yield User.getRandomUser(region);
            let randomUser = users[Math.floor(Math.random() * users.length)];
            while (randomUser._id == user._id) {
                users = yield User.getRandomUser(region);
                randomUser = users[Math.floor(Math.random() * users.length)];
            }
            user_id = randomUser._id;
            randomSticker = randomStickerId(randomUser.album);
            if (user.album[randomSticker] > 0) {
                randomSticker = null;
            }
        }
        const album = yield Album.findOne({ name: "Qatar" });
        const sticker = album.stickerList[randomSticker];
        return {
            user_id,
            randomSticker,
            sticker,
            flag: `https://countryflagsapi.com/png/${sticker.category}`,
        };
    });
};
var randomStickerId = function (obj) {
    var keys = Object.keys(obj);
    keys = keys.filter((key) => obj[key] >= 0);
    return keys[Math.floor(keys.length * Math.random())];
};
exports.default = router;
//# sourceMappingURL=swipe.js.map