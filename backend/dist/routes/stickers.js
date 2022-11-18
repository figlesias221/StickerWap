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
const router = express_1.default.Router();
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const album = req.user.album;
        res.send({ album });
    }
    catch (e) {
        res.status(500).send();
    }
}));
// Post sticker to album
router.post("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stickerId = req.params.id;
        const album = req.user.album;
        album[stickerId] = album[stickerId] + 1;
        req.user.markModified("album");
        yield req.user.save();
        res.send(album);
    }
    catch (e) {
        res.status(500).send();
    }
}));
// Delete sticker from album
router.delete("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield req.user.save();
        res.send(album);
    }
    catch (e) {
        res.status(500).send();
    }
}));
exports.default = router;
//# sourceMappingURL=stickers.js.map