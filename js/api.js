// Модуль для отрисовки меток на карте
import {showErrorPopup, showSuccessPopup, showAlert} from './popup.js';

const loadData = (cb) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then(cb)
    .catch(() => showAlert('Ошибка загрузки данных!'));
};

const uploadData = (body) => {
  fetch('https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        showSuccessPopup();
      } else {
        throw new Error();
      }
    })
    .catch(showErrorPopup);
};

export {loadData, uploadData};
