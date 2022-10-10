export { };

let mongoose = require("mongoose");

const stickerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    country: { type: String, required: true },
    count: { type: Number, required: true },
});

module.exports = mongoose.model('Sticker', stickerSchema);