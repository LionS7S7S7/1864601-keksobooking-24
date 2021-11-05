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
}

// Создаем массив строк случайной длины из значений массива так, чтобы они не повторялись

const getShuffledItems = (items) => items.slice().sort(() => 0.5 - Math.random());

export {getRandomPositiveFloat, getRandomPositiveInteger, getShuffledItems};
