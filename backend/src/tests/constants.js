const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Pepe",
  email: "pepe@pepe.com",
  password: "pepepeppepe!!",
  region: "Montevideo",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, "casanova"),
    },
  ],
  albums: [],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "pepito",
  email: "pepito@pepito.com",
  password: "myhouse099@@",
  region: "Montevideo",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, "casanova"),
    },
  ],
};

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  setupDatabase,
};
