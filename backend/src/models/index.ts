const dbConfig = require("../config/db.config");

let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {
  mongoose,
  url: dbConfig.url,
  users: require("./user")(mongoose),
};

module.exports = {
  db,
};
