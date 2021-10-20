import  {createOffer} from './data';
import {mapTestCard, getCardElement} from './ads.js';

// Вывод данных из модулей
const similarObjects = Array.from({length: 10}, createOffer);

// Данные DOM

const dataCardsElements = getCardElement(similarObjects);
mapTestCard.appendChild(dataCardsElements[0]);
