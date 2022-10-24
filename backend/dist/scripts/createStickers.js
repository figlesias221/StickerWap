"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAlbum = exports.createQatarStickerList = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Sticker = require("../models/stickers");
const countries = [
    "Qatar",
    "Ecuador",
    "Senegal",
    "Netherlands",
    "England",
    "Iran",
    "United States",
    "Wales",
    "Argentina",
    "Saudi Arabia",
    "Mexico",
    "Poland",
    "France",
    "Australia",
    "Denmark",
    "Tunisia",
    "Spain",
    "Costa Rica",
    "Germany",
    "Japan",
    "Belgium",
    "Canada",
    "Morocco",
    "Croatia",
    "Brazil",
    "Serbia",
    "Switzerland",
    "Cameroon",
    "Portugal",
    "Ghana",
    "Uruguay",
    "South Korea",
];
const countryAbreviationDictonary = {
    Qatar: "QAT",
    Ecuador: "ECU",
    Senegal: "SEN",
    Netherlands: "NED",
    England: "ENG",
    Iran: "IRN",
    "United States": "USA",
    Wales: "WAL",
    Argentina: "ARG",
    "Saudi Arabia": "KSA",
    Mexico: "MEX",
    Poland: "POL",
    France: "FRA",
    Australia: "AUS",
    Denmark: "DEN",
    Tunisia: "TUN",
    Spain: "ESP",
    "Costa Rica": "CRC",
    Germany: "GER",
    Japan: "JPN",
    Belgium: "BEL",
    Canada: "CAN",
    Morocco: "MAR",
    Croatia: "CRO",
    Brazil: "BRA",
    Serbia: "SRB",
    Switzerland: "SUI",
    Cameroon: "CMR",
    Portugal: "POR",
    Ghana: "GHA",
    Uruguay: "URU",
    "South Korea": "KOR",
};
const createQatarStickerList = () => {
    const stickers = {};
    let j = 0;
    // Create 8 special stickers
    for (let i = 0; i <= 7; i++) {
        const sticker = new Sticker({
            _id: new mongoose_1.default.Types.ObjectId(),
            name: "FWC_" + i,
            category: "FWC",
            id: j,
        });
        stickers[j] = sticker;
        j++;
    }
    // Create 10 stadium stickers and Ball
    for (let i = 0; i <= 10; i++) {
        const sticker = new Sticker({
            _id: new mongoose_1.default.Types.ObjectId(),
            name: "STADIUM_" + i,
            category: "STADIUM",
            id: j,
        });
        stickers[j] = sticker;
        j++;
    }
    // Create a dictionary with all stickers to save in mongoDB
    // For each country, create 12 sticker with id `country` + `_` + `number` (1-19)
    for (let country of countries) {
        for (let i = 1; i < 20; i++) {
            const sticker = new Sticker({
                _id: new mongoose_1.default.Types.ObjectId(),
                name: countryAbreviationDictonary[country] + "_" + i,
                category: country,
                id: j,
            });
            stickers[j] = sticker;
            j++;
        }
    }
    // Create 11 museum stickers
    for (let i = 0; i <= 11; i++) {
        const sticker = new Sticker({
            _id: new mongoose_1.default.Types.ObjectId(),
            name: "MUSEUM_" + i,
            category: "MUSEUM",
            id: j,
        });
        stickers[j] = sticker;
        j++;
    }
    return stickers;
};
exports.createQatarStickerList = createQatarStickerList;
const buildAlbum = () => {
    const album = {};
    for (let j = 0; j <= 638; j++) {
        album[j] = 0;
    }
    return album;
};
exports.buildAlbum = buildAlbum;
//# sourceMappingURL=createStickers.js.map