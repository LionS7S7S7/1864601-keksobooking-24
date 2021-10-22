// Модуль отвечающий за перевод страницы в неактивное состояние

const adForm = document.querySelector('.ad-form');
const fieldsetBlocks = adForm.querySelectorAll('fieldset');

// Блокируем содержимое блока
const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  fieldsetBlocks.forEach((fieldsetBlock) => {
    fieldsetBlock.setAttribute('disabled', 'disabled');
  });
};

// Убираем блокировку блока
const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  fieldsetBlocks.forEach((fieldsetBlock) => {
    fieldsetBlock.removeAttribute('disabled');
  });
};

export {disableAdForm, enableAdForm};
