import {generatePins} from './map.js';
import {debounce} from './util.js';

const mapFilterItems = document.querySelector('.map__filters');
const filterItems = mapFilterItems.querySelectorAll('select');
const featuresFieldsetItems = mapFilterItems.querySelector('#housing-features');
const localOffers = [];

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

  const filterItemsIndex = [
    'type',
    'priceRange',
    'rooms',
    'guests',
  ];

  const filterByItems = {};
  const filterByFeatures = [];

  filterItems.forEach((item, key) => String(item.value) !== 'any' && (filterByItems[filterItemsIndex[key]] = item.value));

  featuresFieldsetItems.querySelectorAll('input:checked').forEach((item) => filterByFeatures.push(item.value));

  newData = filterBases(localOffers, filterByItems, filterByFeatures);

  generatePins(newData);
};

mapFilterItems.addEventListener('change', debounce(filterData));

export {disableFilter, enableFilter};
