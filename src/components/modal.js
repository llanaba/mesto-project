export function setClosePopupEventListeners(popup) {
  const closeButton = popup.querySelector('.popup__button-close');
  closeButton.addEventListener('click', function() {
    closePopup(popup);
  });
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup);
  document.removeEventListener('click', closeOverlayPopup);
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscPopup);
  document.addEventListener('click', closeOverlayPopup);
}

export function handleViewImageClick(imgLink, caption) {
  const popupViewImage = document.querySelector('.popup_view-image');
  const imageElement = document.querySelector('.popup__container_fullscreen')
  imageElement.querySelector('.figure__image').src = imgLink;
  imageElement.querySelector('figcaption').textContent = caption.textContent;
  openPopup(popupViewImage);
}

function closeEscPopup(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup)
  }
}

function closeOverlayPopup(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup)
  }
}