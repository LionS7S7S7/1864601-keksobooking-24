import {resetMap} from './map.js';
import {resetForm} from './form.js';

const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');

const closeSuccessPopup = () => {
  const successPopup = document.querySelector('.success');
  if (successPopup) {
    successPopup.remove();
  }
};

const closeErrorPopup = () => {
  const errorPopup = document.querySelector('.error');
  if (errorPopup) {
    errorPopup.remove();
  }
};

const handleDocumentClick = () => {
  closeSuccessPopup();
  closeErrorPopup();
  document.removeEventListener('click', handleDocumentClick);
};

const handleDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeSuccessPopup();
    closeErrorPopup();
    document.removeEventListener('keydown', handleDocumentKeydown);
  }
};

const showSuccessPopup = () => {
  const successPopup = successPopupTemplate.cloneNode(true);
  document.body.appendChild(successPopup);
  resetMap();
  resetForm();
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleDocumentKeydown);
};

const showErrorPopup = () => {
  const errorPopup = errorPopupTemplate.cloneNode(true);
  document.body.appendChild(errorPopup);
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleDocumentKeydown);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = '300px';
  alertContainer.style.height = 'min-content';
  alertContainer.style.top = 0;
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.margin = 'auto';
  alertContainer.style.padding = '14px';
  alertContainer.style.fontSize = '14px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
  alertContainer.style.border = '2px solid #ff6d51';
  alertContainer.style.borderRadius = '8px';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
};

export {showErrorPopup, showSuccessPopup, showAlert};
