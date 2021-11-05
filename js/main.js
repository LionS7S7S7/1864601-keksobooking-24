import {disableFilter, enableFilter} from './filter.js';
import {disableAdForm, enableAdForm, resetForm, resetButton} from './form.js';
import {generatePins, resetMap, mapCanvas, DEFAULT_LOCATION, MAP_ZOOM} from './map.js';
import {loadData} from './api.js';

const DEFAULT_SIMILAR_OFFER_IDX = 10;
const LOW_PRICE_LIMIT = 10000;
const MIDDLE_PRICE_LIMIT = 50000;

resetButton.addEventListener('click', () => {
  resetForm();
  resetMap();
});

// Переключение состояния страницы
disableFilter();
disableAdForm();

mapCanvas.addEventListener('load', () => {
  enableAdForm();
  loadData((serverData) => {
    enableFilter();
    serverData.forEach((serverDataItem)=> {
      let priceRange = 'low';
      if (serverDataItem.offer.price > LOW_PRICE_LIMIT) {
        priceRange = 'middle';
      }
      if (serverDataItem.offer.price > MIDDLE_PRICE_LIMIT) {
        priceRange = 'high';
      }
      serverDataItem.offer.priceRange = priceRange;
    });
    window.PINS_DATA = serverData;
    generatePins(serverData.slice(0, DEFAULT_SIMILAR_OFFER_IDX));
  });
});

mapCanvas.setView({
  lat: DEFAULT_LOCATION.lat,
  lng: DEFAULT_LOCATION.lng,
}, MAP_ZOOM);
