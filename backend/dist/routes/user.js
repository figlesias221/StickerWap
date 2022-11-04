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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const User = require("../models/user");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        if (!req.body.name ||
            !req.body.email ||
            !req.body.password ||
            !req.body.region ||
            !req.body.phoneNumber) {
            res.status(400).send({ error: "Campos incompletos" });
            return;
        }
        try {
            const user = new User(req.body);
            user._id = new mongoose_1.default.Types.ObjectId();
            yield user.save();
            const token = yield user.generateAuthToken();
            res.status(201).send({
                id: user._id,
                name: user.name,
                email: user.email,
                region: user.region,
                phoneNumber: user.phoneNumber,
                token: token,
            });
        }
        catch (error) {
            if (error.code === 11000) {
                res.status(400).send({ error: "Usuario ya existe" });
            }
            else if (error._message) {
                res.status(400).send({ error: "Email ya en uso" });
            }
            else {
                res.status(500).send({ error: "Algo salio mal" });
            }
        }
    });
});
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByCredentials(req.body.email, req.body.password);
        if (!user) {
            return res
                .status(401)
                .send({ error: "Error de autenticación. Intenta de nuevo." });
        }
        const token = yield user.generateAuthToken();
        res.send({
            id: user._id,
            name: user.name,
            email: user.email,
            region: user.region,
            token: token,
        });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
}));
router.post("/logout", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        yield req.user.save();
        res.send({ message: "Logout exitoso" });
    }
    catch (e) {
        res.status(500).send();
    }
}));
router.get("/me", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        res.send({
            id: user._id,
            name: user.name,
            email: user.email,
            region: user.region,
            phoneNumber: user.phoneNumber,
        });
    }
    catch (e) {
        res.status(500).send();
    }
}));
router.put("/me", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "region", "phoneNumber"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: "Campos inválidos" });
    }
    try {
        const user = req.user;
        updates.forEach((update) => (user[update] = req.body[update]));
        yield user.save();
        res.send({
            id: user._id,
            name: user.name,
            email: user.email,
            region: user.region,
            phoneNumber: user.phoneNumber,
        });
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map