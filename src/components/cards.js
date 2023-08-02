import { openPopup, closePopup, handleViewImageClick } from './modal.js';
import { toggleButtonState } from './validate.js';

const existingCards = document.querySelector('.cards__list');
const popupAddCard = document.querySelector('.popup_add-card');
const cardTemplate = document.querySelector('#card').content;
const placeInput = popupAddCard.querySelector('input[name="place-name"]');
const imgLinkInput = popupAddCard.querySelector('input[name="place-link"]');
const saveCardButton = popupAddCard.querySelector('.popup__button-save');

export function addExistingCards(cardList) {
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

export function handleAddCardClick(popupAddCard) {
  openPopup(popupAddCard);
}

export function handleCardFormSubmit(evt, popupAddCard) {
  const cardData = {
    name: placeInput.value,
    link: imgLinkInput.value
  }
  renderCard(cardData, cardTemplate);
  evt.target.reset()
  toggleButtonState([placeInput, imgLinkInput], saveCardButton, 'popup__button-save_disabled')
  closePopup(popupAddCard);
}