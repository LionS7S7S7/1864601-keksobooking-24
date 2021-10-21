// Подключаем шаблон карточки
const adsTemplate = document.querySelector('#card').content;
const newCardTemplate = adsTemplate.querySelector('.popup');

// Подключаем блок с картой для вставки тестовой карточки
const mapTestCard = document.querySelector('.map__canvas')

// Создаём объект с типами жилья
const offerType = {
  flat: Квартира,
  bungalow: Бунгало,
  house: Дом,
  palace: Дворец,
  hotel: Отель,
};

// Создаём DOM-элементы, соответствующие объявлениям, и заполняем их данными

// Стрелочная функция возвращает метод map, запущенный на переданном массиве данных.
const getCardElement = ({author, offer}) => {
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
      // Объявляем новый объект с свойствами без значений
      const offer = {
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
      };

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
        featureElement.classList.add('popup__feature');
        featureElement.classList.add(`popup__feature--${feature}`);
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
        photoElement.classList.add('popup__photo');
        photoElement.alt = 'Фотография жилья';
        popupPhotos.appendChild(photoElement);
        });
        } else {
          popupPhotos.remove();
        }
        author.avatar ? popupAvatar.src = author.avatar : popupAvatar.remove();
  return dataElement;
};

// Экспорт для main.js с последующим добавлением в конец списка с нулевым индексом
export {mapTestCard, getCardElement};
