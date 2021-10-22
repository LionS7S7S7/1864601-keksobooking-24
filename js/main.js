import  {createOffer} from './data';
import {mapTestCard, getCardElement} from './ads.js';
import {disableFilter, enableFilter} from './filter.js';
import {disableAdForm, enableAdForm} from './form.js';

const DEFAULT_SIMILAR_OFFER_IDX = 0;
// Вывод данных из модулей
const similarOffers = Array.from({length: 10}, createOffer);

// Данные DOM
const similarOffer = similarOffers[DEFAULT_SIMILAR_OFFER_IDX];
const cardElement = getCardElement(similarOffer);
mapTestCard.appendChild(cardElement);

// Переключение состояния страницы
disableFilter();
disableAdForm();
enableFilter();
enableAdForm();
