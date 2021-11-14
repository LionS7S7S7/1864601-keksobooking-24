// Импорт данных для меток
import {getCardElement} from './card.js';

// Адрес по умолчанию
const DEFAULT_LOCATION = {
  lat: 35.66844,
  lng: 139.60078,
};
const MAP_ZOOM = 12;
// Создаём главную метку
const MainPin = {
  SIZE: [52, 52],
  ANCHOR: [26, 52],
  ICON: './img/main-pin.svg',
};
// Создаём обычную метку
const Pin = {
  SIZE: [40, 40],
  ANCHOR: [20, 40],
  ICON: './img/pin.svg',
};

// Переход страницы в активное состояние
const formAddress = document.querySelector('#address');

const mapCanvas = L.map('map-canvas');

// Подключаем карту
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapCanvas);

const mainPinIcon = L.icon({
  iconUrl: MainPin.ICON,
  iconSize: MainPin.SIZE,
  iconAnchor: MainPin.ANCHOR,
});

const mainPinMarker = L.marker(
  {
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(mapCanvas);

// Возвращаем координаты при перемещении маркера и заполняем поля адреса
mainPinMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  formAddress.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
});

// Создаём слой для добавления меток
const markerGroup = L.layerGroup().addTo(mapCanvas);

// Балун
const createPin = (point, index, data) => {
  const {lat, lng} = point.location;
  const pinIcon = L.icon({
    iconUrl: Pin.ICON,
    iconSize: Pin.SIZE,
    iconAnchor: Pin.ANCHOR,
  });
  const pinMarker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: pinIcon,
    },
  );
  pinMarker
    .addTo(markerGroup)
    .bindPopup(
      data[index],
      {
        keepInView: true,
      },
    );
};

// Добавляем маркеры на карту
const generatePins = (data, pinsCount = 10) => {
  data = data.slice(0, pinsCount);
  const dataCardsElements = getCardElement(data);
  markerGroup.clearLayers();
  data.forEach((element,index) => {
    createPin(element,index, dataCardsElements);
  });
};

const resetMap = () => {
  mainPinMarker.setLatLng(DEFAULT_LOCATION);
  mapCanvas.setView({
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
  }, MAP_ZOOM);
};

export {generatePins, resetMap, mapCanvas, MAP_ZOOM, DEFAULT_LOCATION};
