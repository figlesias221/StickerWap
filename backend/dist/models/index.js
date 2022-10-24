"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = require("../config/db.config");
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {
    mongoose,
    url: dbConfig.url,
    users: require("./user")(mongoose),
};
exports.default = db;
//# sourceMappingURL=index.js.map