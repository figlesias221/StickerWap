"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const Album = require("../models/album");
const router = express_1.default.Router();
router.get("/", auth_1.default, async (req, res) => {
    try {
        const album = await Album.findOne({ name: "Qatar" });
        res.send({ album });
    }
    catch (e) {
        res.status(500).send();
    }
});
exports.default = router;
//# sourceMappingURL=album.js.map