import {disableFilter, enableFilter} from './filter.js';
import {disableAdForm, enableAdForm} from './form.js';
import {mapCanvas, DefaultLocation, MAP_ZOOM} from './map.js';
import {getData} from './api.js';
import {uploadPhotos} from './avatar.js';

const LOW_PRICE_LIMIT = 10000;
const MIDDLE_PRICE_LIMIT = 50000;

// Переключение состояния страницы
disableFilter();
disableAdForm();

mapCanvas.addEventListener('load', () => {
  enableAdForm();
  getData((serverData) => {
    enableFilter(serverData);
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
  });
});

uploadPhotos();

mapCanvas.setView({
  lat: DefaultLocation.lat,
  lng: DefaultLocation.lng,
}, MAP_ZOOM);
