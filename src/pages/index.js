import './index.css'

import { initialCards } from '../components/cards_data.js';
import { enableValidation } from '../components/validate.js';
import { openPopup, closePopup } from '../components/modal.js';
import {
  addExistingCards,
  handleAddCardClick,
  handleCardFormSubmit
  } from '../components/cards.js';

import { setClosePopupEventListeners } from '../components/modal.js';

import {
  getUser,
  getInitialCards,
  updateProfileInfo
  } from '../components/api.js';

const validationSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input-text',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'form__input-text_error',
  errorClass: 'form__input-error_active'
}

// * * * VARIABLES AND FUNCTIONS * * *

// Popup windows
const popups = Array.from(document.querySelectorAll('.popup'))
const popupProfileEdit = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');

// Card-related buttons and template
const addCardForm = document.querySelector('form[name="new-card-form"]');
const addCardButton = document.querySelector('.profile__button-add');

// Profile-related buttons, form, fields and values
const editProfileButton = document.querySelector('.profile__button-edit');
const editProfileForm = document.querySelector('form[name="edit-profile-form"]');
const nameInput = popupProfileEdit.querySelector('input[name="user-name"]');
const descriptionInput = popupProfileEdit.querySelector('input[name="user-description"]');
const userName = document.querySelector('h1.profile__name');
const userDescription = document.querySelector('p.profile__description');
const userAvatar = document.querySelector('.profile__avatar');

// Functions responsible for Profile Editing

function handleEditProfileClick() {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  openPopup(popupProfileEdit);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  updateProfileInfo(nameInput.value, descriptionInput.value)
  closePopup(popupProfileEdit);
  renderUserInfo('me');
}

function renderUserInfo(userId) {
  getUser(userId)
  .then((userData) => {
    userName.textContent = userData.name
    userDescription.textContent = userData.about
    userAvatar.src = userData.avatar
  })
}

// * * * MAIN CODE * * *

// Enabling validation for all forms on the site
enableValidation(validationSelectors);
renderUserInfo('me');


// Filling the page with existing data
getInitialCards()
  .then((cardsData) => {
    console.log(cardsData)
    addExistingCards(cardsData)
  })


// Filling the page with existing data
// addExistingCards(initialCards);


// * * * BUTTON AND FORM LISTENERS * * *

// Edit Profile Form: opening, closing, submitting
editProfileButton.addEventListener('click', handleEditProfileClick);
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

// Adding Card Form: opening, closing, submitting
addCardButton.addEventListener('click', function() {
  handleAddCardClick(popupAddCard);
});
addCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  handleCardFormSubmit(evt, popupAddCard);
});

// Setting closing listeners for all popups
popups.forEach((popup) => {
  setClosePopupEventListeners(popup);
})


