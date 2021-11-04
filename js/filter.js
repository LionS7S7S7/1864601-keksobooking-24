// Модуль отвечающий за активное состояние карты

const mapFilter = document.querySelector('.map__filters');
const filterItems = mapFilter.querySelectorAll('select');

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

export {disableFilter, enableFilter};
