import {generatePins} from './map.js';
import {debounce} from './util.js';

const mapFilterItems = document.querySelector('.map__filters');
const filterItems = mapFilterItems.querySelectorAll('select');
const featuresFieldsetItems = mapFilterItems.querySelector('#housing-features');
const localOffers = [];
const FILTER_ITEMS_INDEX = ['type', 'priceRange', 'rooms', 'guests'];

const disableFilter = () => {
  mapFilterItems.classList.add('map__filters--disabled');
  filterItems.forEach((filterItem) => {
    filterItem.disabled = true;
  });
};

const enableFilter = (offers = []) => {
  localOffers.push(...offers);
  mapFilterItems.classList.remove('map__filters--disabled');
  filterItems.forEach((filterItem) => {
    filterItem.removeAttribute('disabled');
  });
  // начальное инициализация пинов на карте
  mapFilterItems.reset();
};

const filterBases = (data, filterByItems = {}, filterByFeatures = []) => data.filter((item) => {
  let match = true;

  for (const key in filterByItems)
  {if (String(item.offer[key]) !== filterByItems[key])
  {match = false;}}

  if (item.offer.features)
  {filterByFeatures.forEach((feature) => !item.offer.features.includes(feature) && (match = false));}
  else
  {match = false;}

  return match;
});

const filterData = () => {
  let newData = [];
  const filterByItems = {};
  const filterByFeatures = [];

  filterItems.forEach((item, key) => String(item.value) !== 'any' && (filterByItems[FILTER_ITEMS_INDEX[key]] = item.value));

  featuresFieldsetItems.querySelectorAll('input:checked').forEach((item) => filterByFeatures.push(item.value));

  newData = filterBases(localOffers, filterByItems, filterByFeatures);

  generatePins(newData);
};

mapFilterItems.addEventListener('change', debounce(filterData));
mapFilterItems.addEventListener('reset', debounce(filterData));

export {disableFilter, enableFilter};
