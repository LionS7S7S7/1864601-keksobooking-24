function getRandomArbitrary(min, max,  fractions = 0) {
    if (min >= max || min < 0 || max < 0) {
      return ('Укажите корректный диапазон для генератора!');
    }
    const DEGREE = 10 ** fractions;
    return Math.floor((Math.random() * (max - min) + min) * DEGREE) / DEGREE;
  }
  getRandomArbitrary();

/* При разработке использовались следующие ресурсы:
Базовый код генератора случайных чисел: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
Метод округления чисел: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
Математика в javascript: https://habr.com/ru/post/312880/
*\