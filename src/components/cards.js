import { openPopup, closePopup, handleViewImageClick } from './modal.js';
import { toggleButtonState } from './validate.js';
import {
  deleteCard,
  getInitialCards,
  postNewCard,
  likeCard,
  getUser
} from './api.js';

const cardsContainer = document.querySelector('.cards__list');
const popupAddCard = document.querySelector('.popup_add-card');
const cardTemplate = document.querySelector('#card').content;
const placeInput = popupAddCard.querySelector('input[name="place-name"]');
const imgLinkInput = popupAddCard.querySelector('input[name="place-link"]');
const saveCardButton = popupAddCard.querySelector('.popup__button-save');
const currentUserId = getUser('me').then((userData) => {
  // console.log(userData._id);
})

export function renderInitialCards() {
  getInitialCards()
  .then((cardsData) => {
    addExistingCards(cardsData);
  })
}

export function addExistingCards(cardList) {
  // for (let i = cardList.length - 1; i > 0; i--) {
    for (let i = cardList.length - 1; i >= 0; i--) {
    // console.log(`${cardList[i]['name']}: ${cardList[i]['createdAt']})`);
    // console.log(currentUserId)
    // console.log(`Owner: ${cardList[i]['owner']['_id']}`);
    console.log(cardList[i]['likes']);
    const cardData = {
      name: cardList[i]['name'],
      link: cardList[i]['link'],
      cardId: cardList[i]['_id'],
      likesCount: cardList[i]['likes'].length,
      likes: cardList[i]['likes'],
      cardOwnerId: cardList[i]['owner']['_id'],
    }
    renderCard(cardData, cardTemplate);
  }
}

function renderCard(cardData, cardTemplate) {
  cardsContainer.prepend(createCard(cardData, cardTemplate))
}

function userLikesCard(userId, cardFans) {
  const userLikes = cardFans.some(function(fan) {
    return fan._id === userId
  });
  // console.log(userLikes)
  return userLikes
}

function createCard(cardData, cardTemplate) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('h2');
  const cardImageElement = cardElement.querySelector('.card__image');
  const buttonLikeElement = cardElement.querySelector('.card__button-like');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const buttonBinElement = cardElement.querySelector('.card__button-bin');

  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;
  likeCounter.textContent = cardData.likesCount;

  // console.log(`Here's the owner's id: ${cardData.cardOwnerId}`)
  getUser('me')
    .then((userData) => {
      if (userData._id === cardData.cardOwnerId || cardData.cardOwnerId === undefined) {
        // console.log(`user_id: ${userData._id}, card ownerID: ${cardData.cardOwnerId}`);
        buttonBinElement.style.display = "block";
      } else {
        // console.log('different!')
      }
      console.log(userLikesCard(userData._id, cardData.likes))
      if (userLikesCard(userData._id, cardData.likes)) {
        buttonLikeElement.classList.add('card__button-like_active')
      }
    })

  buttonLikeElement.addEventListener('click', function(evt) {
    handleLikeClick(evt, cardData['cardId']);
  });
  buttonBinElement.addEventListener('click', function(evt) {
    handleRemoveCardClick(evt, cardData['cardId']);
  });
  cardImageElement.addEventListener('click', function() {
    handleViewImageClick(cardImageElement.src, cardTitleElement);
  });
  return cardElement
}

function handleRemoveCardClick(evt, cardId) {
  deleteCard(cardId)
    .then(() => evt.target.closest('.card').remove());
}

function handleLikeClick(evt, cardId) {
  let method
  if (evt.target.classList.contains('card__button-like_active')) {
    method = 'DELETE'
  } else {
    method = 'PUT'
  }
  console.log(method)
  likeCard(cardId, method)
    .then((cardData) => {
      const likes = evt.target.nextElementSibling;
      likes.textContent = cardData.likes.length;
      evt.target.classList.toggle('card__button-like_active');
    })
}

export function handleAddCardClick(popupAddCard) {
  openPopup(popupAddCard);
}

export function handleCardFormSubmit(evt, popupAddCard) {
  const cardData = {
    name: placeInput.value,
    link: imgLinkInput.value
  }
  postNewCard(cardData.name, cardData.link)
    .then((newCardInfo) => {
      cardData.cardId = newCardInfo._id
      cardData.likesCount = newCardInfo.likes.length
      // console.log(`New Card info1: ${newCardInfo.name}`)
      // console.log(`New Card info2: ${newCardInfo.link}`)
      // console.log(`New Card info3: ${newCardInfo._id}`)
    })
  renderCard(cardData, cardTemplate);
  evt.target.reset()
  toggleButtonState([placeInput, imgLinkInput], saveCardButton, 'popup__button-save_disabled')
  closePopup(popupAddCard);
}