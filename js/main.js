// Функции генерации случайных чисел

//  Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

// Функция, возвращающая случайное целое число из переданного диапазона включительно

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Записываем массивы данных для генератора

const TITLE = [
  'Уникальный объект',
  'Акционное предложение',
  'Супер цена!',
  'Горячая новинка холодной осени',
  'Бронируй сейчас',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Уютный уголок тишины в туристической зоне',
  'Апартаменты с видом на будущее',
  'Квартира с мастер спальней и окном в ванной',
  'В центре пересечения истории',
  'Квартира с приложением Умный дом и круглосуточной охраной',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// Создаем массив строк случайной длины из значений массива так, чтобы они не повторялись

const getShuffledItems = (items) => {
  return items.slice().sort(() => 0.5 - Math.random());
};

const getRandomItems = (items) => {
  const randomIdx = getRandomPositiveInteger(0, items.length);

  return getShuffledArray(items).slice(0, randomIdx);
};

// Генерируем данные

const createOffer = () => {
  let randomAvatar = getRandomPositiveInteger(1, 10);
  const randomTitleIndex = getRandomPositiveInteger(0, TITLE.length - 1);
  const randomLocationLat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const randomLocationLng = getRandomPositiveFloat(139.70000, 139.80000, 5);
  const randomPrice = getRandomPositiveInteger(800, 30000);
  const randomTypeIndex = getRandomPositiveInteger(0, TYPE.length - 1);
  const randomRooms = getRandomPositiveInteger(1, 3);
  const randomGuests = getRandomPositiveInteger(1, 3);
  const randomCheckinIndex = getRandomPositiveInteger(0, CHECKIN.length - 1);
  const randomCheckoutIndex = getRandomPositiveInteger(0, CHECKOUT.length - 1);
  const randomArray = getShuffledItems(FEATURES);
  const randomDescriptionIndex = getRandomPositiveInteger(0, DESCRIPTION.length - 1);
  const randomPhotos = getShuffledItems(PHOTOS);
  
  if (randomAvatar < 10) {
    randomAvatar = String(randomAvatar).padStart(2, '0');
};

return {
  author: {
    avatar: `img/avatars/user${randomAvatar}.png`,
  },

  offer: {
    title: TITLE[randomTitleIndex],
    address: `${randomLocationLat}, ${randomLocationLng}`,
    price: randomPrice,
    type: TYPE[randomTypeIndex],
    rooms: randomRooms,
    guests: randomGuests,
    checkin: CHECKIN[randomCheckinIndex],
    checkout: CHECKOUT[randomCheckoutIndex],
    features: randomArray,
    description: DESCRIPTION[randomDescriptionIndex],
    photos: randomPhotos,
  },

  location: {
    lat: randomLocationLat,
    lng: randomLocationLng,
  },
};
};

const similarObjects = Array.from({length: 10}, createOffer);
console.log(similarObjects);