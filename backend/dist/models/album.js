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
Object.defineProperty(exports, "__esModule", { value: true });
let mongoose = require("mongoose");
const albumSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    stickerList: {},
});
albumSchema.statics.findByName = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        const album = yield Album.findOne({ name: name });
        if (!album) {
            throw new Error("No album found");
        }
        return album;
    });
};
const Album = mongoose.model("Album", albumSchema);
module.exports = Album;
//# sourceMappingURL=album.js.map