export {};

let mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  stickerList: {},
});

albumSchema.statics.findByName = async function (name: any) {
  const album = await Album.findOne({ name: name });
  if (!album) {
    throw new Error("No album found");
  }
  return album;
};

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
