// Подключаем шаблон карточки
const adsTemplate = document.querySelector('#card').content.querySelector('.popup');

// Создаём объект с типами жилья
const offerType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const IMG_WIDTH = 45;
const IMG_HEIGHT = 40;
// Создаём DOM-элементы, соответствующие объявлениям, и заполняем их данными
// Стрелочная функция возвращает метод map, запущенный на переданном массиве данных.
const getCardElement = (dataCards) => dataCards.map(({author, offer}) => {
  const dataElement = adsTemplate.cloneNode(true);

  // Объявляем переменные и находим элементы по классам
  const popupTitle = dataElement.querySelector('.popup__title');
  const popupTextAddress = dataElement.querySelector('.popup__text--address');
  const popupTextPrice = dataElement.querySelector('.popup__text--price');
  const popupType = dataElement.querySelector('.popup__type');
  const popupTextCapacity = dataElement.querySelector('.popup__text--capacity');
  const popupTextTime = dataElement.querySelector('.popup__text--time');
  const popupFeatures = dataElement.querySelector('.popup__features');
  const popupDescription = dataElement.querySelector('.popup__description');
  const popupAvatar = dataElement.querySelector('.popup__avatar');
  const popupPhotos = dataElement.querySelector('.popup__photos');
  const popupPhoto = dataElement.querySelector('.popup__photo');
  // Объявляем новый объект с свойствами без значений
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos,
  } = offer;

  // Создаём условия удаления элементов, если нет значений в строке
  title ? popupTitle.textContent = title : popupTitle.remove();
  address ? popupTextAddress.textContent = address : popupTextAddress.remove();
  price ? popupTextPrice.textContent = `${price} ₽/ночь` : popupTextPrice.remove();
  type ? popupType.textContent = offerType[type] : popupType.remove();
  (rooms && guests) ? popupTextCapacity.textContent = `${rooms} комнаты для ${guests} гостей` : popupTextCapacity.remove();
  (checkin && checkout) ? popupTextTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}` : popupTextTime.remove();
  if (features) {
    features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__features');
      featureElement.classList.add(`popup__features--${feature}`);
      popupFeatures.appendChild(featureElement);
    });
  } else {
    popupFeatures.remove();
  }
  description ? popupDescription.textContent = description : popupDescription.remove();
  if (photos) {
    photos.forEach((photo) => {
      const photoElement = document.createElement('img');
      photoElement.src = photo;
      photoElement.width = IMG_WIDTH;
      photoElement.height = IMG_HEIGHT;
      photoElement.classList.add('popup__photo');
      photoElement.alt = 'Фотография жилья';
      popupPhotos.appendChild(photoElement);
      popupPhoto.remove();
    });
  } else {
    popupPhotos.remove();
  }
  author.avatar ? popupAvatar.src = author.avatar : popupAvatar.remove();
  return dataElement;
});

// Экспорт для main.js с последующим добавлением в конец списка с нулевым индексом
export {getCardElement};
