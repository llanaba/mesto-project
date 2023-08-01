export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
}

export function handleViewImageClick(imgLink, caption) {
  const popupViewImage = document.querySelector('.popup_view-image');
  const imageElement = document.querySelector('.popup__container_fullscreen')
  imageElement.querySelector('.figure__image').src = imgLink;
  imageElement.querySelector('figcaption').textContent = caption.textContent;
  handleCloseImage(popupViewImage);
  openPopup(popupViewImage);
}

function handleCloseImage(popupViewImage) {
  const closeImageButton = popupViewImage.querySelector('.popup__button-close');
  closeImageButton.addEventListener('click', function() {
    closePopup(popupViewImage);
  });
  popupViewImage.addEventListener('click', function () {
    closePopup(popupViewImage);
  })
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popupViewImage);
    }
  })
}