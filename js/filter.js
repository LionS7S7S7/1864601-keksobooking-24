import {generatePins} from './map.js';
import {debounce} from './utils/debounce.js';

const mapFilter = document.querySelector('.map__filters');
const filterItems = mapFilter.querySelectorAll('select');

const wifiFilterElement = mapFilter.querySelector('[value="wifi"]');
const dishwasherFilterElement = mapFilter.querySelector('[value="dishwasher"]');
const parkingFilterElement = mapFilter.querySelector('[value="parking"]');
const washerFilterElement = mapFilter.querySelector('[value="washer"]');
const elevatorFilterElement = mapFilter.querySelector('[value="elevator"]');
const conditionerFilterElement = mapFilter.querySelector('[value="conditioner"]');

const typeFilterElement = mapFilter.querySelector('[name="housing-type"]');
const priceFilterElement = mapFilter.querySelector('[name="housing-price"]');
const roomsFilterElement = mapFilter.querySelector('[name="housing-rooms"]');
const guestsFilterElement = mapFilter.querySelector('[name="housing-guests"]');

const disableFilter = () => {
  mapFilter.classList.add('map__filters--disabled');
  filterItems.forEach((filterItem) => {
    filterItem.disabled = true;
  });
};

const enableFilter = () => {
  mapFilter.classList.remove('map__filters--disabled');
  filterItems.forEach((filterItem) => {
    filterItem.removeAttribute('disabled');
  });
};

const filterBase = (data, key, filter) => data.filter((item) => item.offer[key] === filter.value);

const filterFeatures = (data, feature, filter) => {
  if (!filter.checked) {
    return data;
  }
  return data.filter((item) => item.offer.features ? item.offer.features.includes(feature) : false);
};

const filterData = () => {
  let newData = window.PINS_DATA;

  if (typeFilterElement.value !== 'any') {
    newData = filterBase(newData, 'type', typeFilterElement);
  }

  if (priceFilterElement.value !== 'any') {
    newData = filterBase(newData, 'priceRange', priceFilterElement);
  }

  if (roomsFilterElement.value !== 'any') {
    newData = filterBase(newData, 'rooms', roomsFilterElement);
  }

  if (guestsFilterElement.value !== 'any') {
    newData = filterBase(newData, 'guests', guestsFilterElement);
  }

  newData = filterFeatures(newData, wifiFilterElement.value, wifiFilterElement);
  newData = filterFeatures(newData, dishwasherFilterElement.value, dishwasherFilterElement);
  newData = filterFeatures(newData, parkingFilterElement.value, parkingFilterElement);
  newData = filterFeatures(newData, washerFilterElement.value, washerFilterElement);
  newData = filterFeatures(newData, elevatorFilterElement.value, elevatorFilterElement);
  newData = filterFeatures(newData, conditionerFilterElement.value, conditionerFilterElement);

  generatePins(newData.slice(0, 10));
};

mapFilter.addEventListener('change', debounce(filterData));


export {disableFilter, enableFilter};
