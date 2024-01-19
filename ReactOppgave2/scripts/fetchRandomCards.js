import fs from "node:fs";
import { url, fetchApi, options, dataBaseFilePath } from "./fetchUtils.js";

const cardIdArray = JSON.parse(fs.readFileSync(dataBaseFilePath));

const fetchRandomCards = (mainDataArray, cardCount = 2, cardArray = []) => {
  if (cardArray.length === cardCount) return cardArray;
  else {
    const randIndex = Math.floor(Math.random() * mainDataArray.length);
    cardArray.push(mainDataArray[randIndex]);
    mainDataArray.splice(randIndex, 1);
    return fetchRandomCards(mainDataArray, cardCount, cardArray);
  }
};

const randomCardId = fetchRandomCards(cardIdArray);
console.log(randomCardId);
const fetchSelectedCardsFromApi = async (selectedCards) => {
  const cardInfoArray = [];
  for (let i = 0; i < selectedCards.length; i++) {
    const cardUrl = `${url}/${selectedCards[i]}`;
    const cardInfo = await fetchApi(cardUrl, options);
    cardInfoArray.push(cardInfo);
  }
  return cardInfoArray;
};

const randomCardInfo = await fetchSelectedCardsFromApi(randomCardId);

console.log(randomCardInfo);
