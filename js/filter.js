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

const filterBases = (data, filterByItems = [], filterByFeatures = []) => data.filter((item) => {
  let match = true;

  for (const key in filterByItems)
    if (item.offer[key] != filterByItems[key])
      match = false;

  if (item.offer.features) {
    for (let i = 0; i < filterByFeatures.length; i++)
      if (!item.offer.features.includes(filterByFeatures[i]))
        match = false;
  } else
    match = false;

  return match;
});

const filterData = () => {
  let newData = [];

  const filterItemsIndex = [
    'type',
    'priceRange',
    'rooms',
    'guests'
  ];

  const filterByItems = {};
  const filterByFeatures = [];

  for (let i = 0; i < filterItems.length; i++)
    if (filterItems[i].value != 'any')
      filterByItems[filterItemsIndex[i]] = filterItems[i].value;

  featuresFieldsetNode.querySelectorAll('input:checked').forEach((item) => filterByFeatures.push(item.value));

  newData = filterBases(localOffers, filterByItems, filterByFeatures);

  generatePins(newData);
};

mapFilter.addEventListener('change', debounce(filterData));

export {disableFilter, enableFilter};
