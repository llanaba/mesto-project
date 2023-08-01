import { openPopup, closePopup } from './modal.js';

const existingCards = document.querySelector('.cards__list');
const popupViewImage = document.querySelector('.popup_view-image');

export function addExistingCards(cardList, cardTemplate) {
  for (let i = 0; i < cardList.length; i++) {
    const cardData = {
      name: cardList[i]['name'],
      link: cardList[i]['link']
    }
    renderCard(cardData, cardTemplate);
  }
}

function renderCard(cardData, cardTemplate) {
  existingCards.prepend(createCard(cardData, cardTemplate))
}

function createCard(cardData, cardTemplate) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('h2');
  const cardImageElement = cardElement.querySelector('.card__image');
  const buttonLikeElement = cardElement.querySelector('.card__button-like');
  const buttonBinElement = cardElement.querySelector('.card__button-bin');

  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;

  buttonLikeElement.addEventListener('click', handleLikeClick);
  buttonBinElement.addEventListener('click', handleRemoveCardClick);
  cardImageElement.addEventListener('click', function() {
    handleViewImageClick(cardImageElement.src, cardTitleElement);
  });
  return cardElement
}

function handleRemoveCardClick(evt) {
  evt.target.closest('.card').remove();
}

function handleLikeClick(evt) {
  evt.target.classList.toggle('card__button-like_active');
}

function handleViewImageClick(imgLink, caption) {
  const imageElement = document.querySelector('.popup__container_fullscreen')
  imageElement.querySelector('.figure__image').src = imgLink;
  imageElement.querySelector('figcaption').textContent = caption.textContent;
  // imageElement.closest('.popup_view-image').addEventListener('click', function () {
  //   closePopup(imageElement.closest('.popup_view-image'));
  // })
  openPopup(popupViewImage);
}

export function handleAddCardClick(popupAddCard) {
  openPopup(popupAddCard);
}

export function handleCardFormSubmit(evt, popupAddCard, cardTemplate) {
  const placeInput = popupAddCard.querySelector('input[name="place-name"]');
  const imgLinkInput = popupAddCard.querySelector('input[name="place-link"]');
  const cardData = {
    name: placeInput.value,
    link: imgLinkInput.value
  }
  renderCard(cardData, cardTemplate);
  evt.target.reset()
  closePopup(popupAddCard);
}