import express from "express";

const router = express.Router();

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

router.get("/", async (req, res) => {
  try {
    res.send(regionsUruguay);
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
