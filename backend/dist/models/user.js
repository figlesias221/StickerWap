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
const createStickers_1 = require("../scripts/createStickers");
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
    album: { type: {}, default: (0, createStickers_1.buildAlbum)() },
    tokens: [],
});
userSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const token = jwt.sign({ _id: user._id.toString() }, "casanova");
        user.tokens = user.tokens.concat({ token });
        yield user.save();
        return token;
    });
};
userSchema.statics.findByCredentials = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ email });
    if (!user) {
        throw new Error("Email o contraseña incorrectos");
    }
    const isMatch = yield bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Contraseña incorrecta");
    }
    return user;
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password")) {
            user.password = yield bcrypt.hash(user.password, 8);
        }
        next();
    });
});
userSchema.statics.getRandomUser = function (region) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.aggregate([
            { $match: { region: region } },
            { $sample: { size: 1 } },
        ]);
        return user;
    });
};
const User = mongoose.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=user.js.map