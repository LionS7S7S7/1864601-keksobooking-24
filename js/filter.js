import {generatePins} from './map.js';
import {debounce} from './util.js';

const mapFilter = document.querySelector('.map__filters');
const filterItems = mapFilter.querySelectorAll('select');
const featuresFieldsetNode = mapFilter.querySelector('#housing-features');
const localOffers = [];

const disableFilter = () => {
  mapFilter.classList.add('map__filters--disabled');
  filterItems.forEach((filterItem) => {
    filterItem.disabled = true;
  });
};

const enableFilter = (offers = []) => {
  localOffers.push(...offers);
  mapFilter.classList.remove('map__filters--disabled');
  filterItems.forEach((filterItem) => {
    filterItem.removeAttribute('disabled');
  });
};

const filterBases = (data, filterByItems = {}, filterByFeatures = []) => data.filter((item) => {
  let match = true;

  for (const key in filterByItems)
  // eslint-disable-next-line eqeqeq
  {if (item.offer[key] != filterByItems[key])
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

  // eslint-disable-next-line eqeqeq
  filterItems.forEach((item, key) => item.value != 'any' && (filterByItems[filterItemsIndex[key]] = item.value));

  featuresFieldsetNode.querySelectorAll('input:checked').forEach((item) => filterByFeatures.push(item.value));

  newData = filterBases(localOffers, filterByItems, filterByFeatures);

  generatePins(newData);
};

mapFilter.addEventListener('change', debounce(filterData));

export {disableFilter, enableFilter};
