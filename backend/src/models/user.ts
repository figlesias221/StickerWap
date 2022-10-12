import { buildAlbum } from "../scripts/createStickers";

export {};

let mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: { type: String, required: true },
  region: { type: String, required: true },
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  album: { type: {}, default: buildAlbum() },
  tokens: [],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "casanova");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email o contraseña incorrectos");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.statics.getRandomUser = async function (region) {
  const user = await User.aggregate([
    { $match: { region: region } },
    { $sample: { size: 1 } },
  ]);
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
