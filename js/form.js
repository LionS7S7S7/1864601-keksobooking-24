// Модуль отвечающий за перевод страницы в неактивное состояние
import {sendData} from './api.js';
import {DefaultLocation, mapCanvas, resetMap} from './map.js';

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;
const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const NUMBER_OF_GUESTS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};
const adForm = document.querySelector('.ad-form');
const resetButton = adForm.querySelector('.ad-form__reset');
const fieldsetBlocks = adForm.querySelectorAll('fieldset');
const titleInput = document.querySelector('#title');
const offerPrice = adForm.querySelector('#price');
const offerType = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const formAddress = adForm.querySelector('#address');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const previewPhotoContainer = document.querySelector('.ad-form__photo');
const mapFilters = document.querySelector('.map__filters');

// Блокируем содержимое блока
const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  fieldsetBlocks.forEach((fieldsetBlock) => {
    fieldsetBlock.disabled = true;
  });
};

// Валидация формы заголовка объявления
titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  MIN_NAME_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_NAME_LENGTH } симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

// Валидация формы цены за ночь
offerType.addEventListener('change', () => {
  offerPrice.min = MIN_PRICE[offerType.value];

  if (typeof Intl.NumberFormat === 'function') {
    const currencyFormater = Intl.NumberFormat('ru-RU');
    offerPrice.placeholder = currencyFormater.format(MIN_PRICE[offerType.value]);
  } else
  {offerPrice.placeholder = MIN_PRICE[offerType.value];}
});

offerPrice.addEventListener('input', (evt) => {
  const type = offerType.value;
  evt.target.setAttribute('min', MIN_PRICE[type]);
  if (!offerPrice.value) {
    evt.target.setCustomValidity('Цена не указана');
  } else if (evt.target.value < MIN_PRICE[type]) {
    evt.target.setCustomValidity(`Цена должна быть выше ${MIN_PRICE[type]}`);
  } else if (evt.target.value > MAX_PRICE) {
    evt.target.setCustomValidity(`Цена должна быть ниже ${MAX_PRICE}`);
  } else {
    evt.target.setCustomValidity('');
  }
  evt.target.reportValidity();
});

const checkCapacity = () => {
  let isValid;
  if ((NUMBER_OF_GUESTS[roomNumber.value]).includes(Number(capacity.value))) {
    capacity.setCustomValidity('');
    isValid = true;
  } else {
    capacity.setCustomValidity('Количество гостей не должно превышать количество комнат');
    isValid = false;
  }
  capacity.reportValidity();
  return isValid;
};

capacity.addEventListener('input', (evt) => {
  checkCapacity();
  evt.target.reportValidity();
});

roomNumber.addEventListener('input', (evt) => {
  checkCapacity();
  evt.target.reportValidity();
});

timeIn.addEventListener('input', (evt) => {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('input', (evt) => {
  timeIn.value = evt.target.value;
});

const resetPhotos = () => {
  previewAvatar.src = '../img/muffin-grey.svg';

  if (previewPhotoContainer.firstChild) {
    previewPhotoContainer.removeChild(previewPhotoContainer.firstChild);
  }
};

// устанавливаем все дефолтные значения для полей формы
const setDefaults = () => {
  // события для установки placeholder [Цена за ночь, руб.]
  offerType.dispatchEvent(new Event('change'));
  // placeholder для Адрес (координаты)
  formAddress.placeholder = `${DefaultLocation.lat.toFixed(5)}, ${DefaultLocation.lng.toFixed(5)}`;
  // если на карте был показан балун то закрываем его
  mapCanvas.closePopup();
  // сбрасываем фильтры карты
  mapFilters.reset();
};

// Убираем блокировку блока
const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  fieldsetBlocks.forEach((fieldsetBlock) => {
    fieldsetBlock.removeAttribute('disabled');
  });
  setDefaults();
};

const resetForm = () => {
  adForm.reset();
  setDefaults();
  resetPhotos();
  resetMap();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (checkCapacity()) {
    const formData = new FormData(evt.target);
    sendData(formData);
    this.reset();
  }
});

adForm.addEventListener('reset', resetForm);

export {disableAdForm, enableAdForm, resetForm, resetButton};
