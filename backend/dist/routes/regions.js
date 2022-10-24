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
const router = express_1.default.Router();
const regionsUruguay = [
    "Montevideo",
    "Salto",
    "Ciudad de la Costa",
    "Maldonado",
    "Rivera",
    "Las Piedras",
    "Tacuarembó",
    "Melo",
    "Artigas",
    "Mercedes",
    "Minas",
    "San José de Mayo",
    "Durazno",
    "Florida",
    "Treinta y Tres",
    "Barros Blancos",
    "Ciudad del Plata",
    "San Carlos",
    "Colonia del Sacramento",
    "Rocha",
    "Fray Bentos",
    "Salinas",
    "Trinidad",
    "18 de Mayo",
    "La Paz",
    "Canelones",
    "Dolores",
    "Carmelo",
    "Unión",
    "Young",
    "Santa Lucía",
    "Progreso",
    "Paso Carrasco",
    "Joaquín Suárez",
    "Nueva Helvecia",
    "General Líber Seregni",
    "Río Branco",
    "Toledo",
    "Paso de los Toros",
    "Tacuarembó",
    "Juan Lacaze",
    "Punta del Este",
    "Parque del Plata",
    "Piriápolis",
    "Libertad",
    "Rosario",
    "Nueva Palmira",
    "Chuy",
    "Atlántida",
    "Cardona",
    "Lascano",
    "Castillos",
    "Pan de Azúcar",
    "Tranqueras",
    "Sarandí del Yí",
    "San Ramón",
    "Tarariras Sauce",
    "Sarandí Grande",
    "José Pedro Varela",
    "Tala",
    "Guichón",
    "La Paloma",
];
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(regionsUruguay);
    }
    catch (e) {
        res.status(500).send();
    }
}));
exports.default = router;
//# sourceMappingURL=regions.js.map