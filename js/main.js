function getRandomIntInclusive(min, max) {
    if (min >= max || min < 0 || max < 0) {
    return ('Укажите корректный диапазон для генератора!');
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  getRandomIntInclusive();

function getRandomArbitrary(min, max,  fractions = 0) {
    if (min >= max || min < 0 || max < 0) {
      return ('Укажите корректный диапазон для генератора!');
    }
    const degree = 10 ** fractions;
    return Math.floor((Math.random() * (max - min) + min) * degree) / degree;
  };
  getRandomArbitrary();

/* При разработке использовались следующие ресурсы:
Базовый код генератора случайных чисел: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
Метод округления чисел: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
Математика в javascript: https://habr.com/ru/post/312880/
*\