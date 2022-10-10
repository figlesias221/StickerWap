export { };

let mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    collection: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sticker" }],
});

module.exports = mongoose.model('Album', albumSchema);