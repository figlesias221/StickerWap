"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get("/", auth_1.default, async (req, res) => {
    try {
        const album = req.user.album;
        res.send({ album });
    }
    catch (e) {
        res.status(500).send();
    }
});
router.post("/:id", auth_1.default, async (req, res) => {
    try {
        const stickerId = req.params.id;
        const album = req.user.album;
        album[stickerId] = album[stickerId] + 1;
        req.user.markModified("album");
        await req.user.save();
        res.send(album);
    }
    catch (e) {
        res.status(500).send();
    }
});
router.delete("/:id", auth_1.default, async (req, res) => {
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
    }
    catch (e) {
        res.status(500).send();
    }
});
exports.default = router;
//# sourceMappingURL=stickers.js.map