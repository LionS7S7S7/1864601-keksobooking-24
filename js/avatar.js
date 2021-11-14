const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const offerAvatar = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const offerPhoto = document.querySelector('#images');
const previewPhotoContainer = document.querySelector('.ad-form__photo');

const addAvatar = () => {
  const file = offerAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
};

const addOfferPhoto = () => {
  const previewPhoto = document.createElement('img');
  previewPhoto.style.width = '120px';
  previewPhoto.style.height = '90px';
  previewPhotoContainer.appendChild(previewPhoto);

  const file = offerPhoto.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPhoto.src = URL.createObjectURL(file);
  }
};

const uploadPhotos = () => {
  offerAvatar.addEventListener('change', addAvatar);
  offerPhoto.addEventListener('change', addOfferPhoto);
};

export { uploadPhotos };
