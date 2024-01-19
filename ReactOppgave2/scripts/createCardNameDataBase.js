/* eslint-env node */
import fs from "node:fs";

import { url, fetchApi, options, dataBaseFilePath } from "./fetchUtils.js";

const cardObject = await fetchApi(url, options);

const cardIdArray = [];

Object.keys(cardObject).forEach((cardType) => {
  cardObject[cardType].forEach((card) => {
    if (!card.rarity || card.type === "Hero") return;
    else {
      cardIdArray.push(card.cardId);
    }
  });
});

fs.writeFileSync(dataBaseFilePath, JSON.stringify(cardIdArray));
