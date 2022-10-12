export {};

let mongoose = require("mongoose");

const stickerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  category: { type: String, required: true },
});

const Sticker = mongoose.model("Sticker", stickerSchema);

module.exports = Sticker;
