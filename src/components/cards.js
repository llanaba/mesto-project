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

export function renderInitialCards(userId) {
  getInitialCards()
  .then((cardsData) => {
    addExistingCards(cardsData, userId);
  })
}

export function addExistingCards(cardList, userId) {
    for (let i = cardList.length - 1; i >= 0; i--) {
    const cardData = {
      name: cardList[i]['name'],
      link: cardList[i]['link'],
      cardId: cardList[i]['_id'],
      likesCount: cardList[i]['likes'].length,
      likes: cardList[i]['likes'],
      cardOwnerId: cardList[i]['owner']['_id'],
    }
    renderCard(cardData, cardTemplate, userId);
  }
}

function renderCard(cardData, cardTemplate, userId) {
  console.log(`Here is userID in renderCard: ${userId}`)
  cardsContainer.prepend(createCard(cardData, cardTemplate, userId))
}

function userLikesCard(userId, cardFans) {
  console.log("I'm inside userLikesCard")
  console.log(`Here is userID in userLikesCard: ${userId}`)
  console.log(`Here is cardFans in userLikesCard: ${cardFans}`)
  if (cardFans) {
    const userLikes = cardFans.some(function(fan) {
      console.log(fan)
      return fan._id === userId
    });
    return userLikes
  }
  // console.log(userLikes)
  return false
}

function createCard(cardData, cardTemplate, userId) {
  console.log(`Here is userID in createCard: ${userId}`)
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('h2');
  const cardImageElement = cardElement.querySelector('.card__image');
  const buttonLikeElement = cardElement.querySelector('.card__button-like');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const buttonBinElement = cardElement.querySelector('.card__button-bin');

  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;
  likeCounter.textContent = cardData.likesCount;

  if (userId === cardData.cardOwnerId || cardData.cardOwnerId === undefined) {
    buttonBinElement.style.display = "block";
  }
  if (userLikesCard(userId, cardData.likes)) {
    buttonLikeElement.classList.add('card__button-like_active')
  }
  // getUser('me')
  //   .then((userData) => {
  //     if (userData._id === cardData.cardOwnerId || cardData.cardOwnerId === undefined) {
  //       buttonBinElement.style.display = "block";
  //     } else {
  //     }
  //     if (userLikesCard(userData._id, cardData.likes)) {
  //       buttonLikeElement.classList.add('card__button-like_active')
  //     }
  //   })

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
  console.log("I'm inside handleCardFormSubmit")
  const cardData = {
    name: placeInput.value,
    link: imgLinkInput.value
  }
  postNewCard(cardData.name, cardData.link)
    .then((newCardInfo) => {
      console.log(`Here's new card Info: ${newCardInfo}`)
      cardData.cardId = newCardInfo._id
      cardData.cardOwnerId = newCardInfo.owner._id
      console.log(`card owner: ${newCardInfo.owner._id}`)
      cardData.likesCount = newCardInfo.likes.length
      const userId = newCardInfo.owner._id
      console.log(userId)
      return userId
    })
    .then((userId) => {
      console.log(`userID: ${userId}`)
      renderCard(cardData, cardTemplate, userId);
      evt.target.reset()
      toggleButtonState([placeInput, imgLinkInput], saveCardButton, 'popup__button-save_disabled')
      closePopup(popupAddCard);
    })
}