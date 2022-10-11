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

export const createQatarStickerList = () => {
  const stickers = {};
  let j = 0;
  // Create 8 special stickers
  for (let i = 0; i <= 7; i++) {
    stickers[j] = {
      name: "FWC_" + i,
      country: "FWC",
      count: 0,
      img: "FWC_" + i + ".png",
      id: j,
    };
    j++;
  }

  // Create 10 stadium stickers and Ball
  for (let i = 0; i <= 10; i++) {
    stickers[j] = {
      name: "STADIUM_" + i,
      country: "STADIUM",
      count: 0,
      img: "STADIUM_" + i + ".png",
      id: j,
    };
    j++;
  }

  // Create a dictionary with all stickers to save in mongoDB
  // For each country, create 12 sticker with id `country` + `_` + `number` (1-19)
  for (let country of countries) {
    for (let i = 1; i < 20; i++) {
      stickers[j] = {
        name: country,
        country: country,
        count: 0,
        img: country + "_" + i + ".png",
        id: j,
      };
      j++;
    }
  }

  // Create 11 museum stickers
  for (let i = 0; i <= 11; i++) {
    stickers[j] = {
      name: "MUSEUM_" + i,
      country: "MUSEUM",
      count: 0,
      img: "MUSEUM_" + i + ".png",
      id: j,
    };
    j++;
  }
  return stickers;
};

export const buildAlbum = () => {
  const album = {};
  for (let j = 0; j < 638; j++) {
    album[j] = 0;
  }
  return album;
};
