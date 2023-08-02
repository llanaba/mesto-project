import './pages/index.css'

import { initialCards } from './components/cards_data.js';
import { enableValidation } from './components/validate.js';
import { openPopup, closePopup } from './components/modal.js';
import {
  addExistingCards,
  handleAddCardClick,
  handleCardFormSubmit
  } from './components/cards.js';

import { setClosePopupEventListeners } from './components/modal.js';

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
const cardTemplate = document.querySelector('#card').content;
const addCardButton = document.querySelector('.profile__button-add');
// const closeAddCardButton = popupAddCard.querySelector('.popup__button-close');

// Profile-related buttons, form, fields and values
const editProfileButton = document.querySelector('.profile__button-edit');
// const closeProfileButton = popupProfileEdit.querySelector('.popup__button-close');
const editProfileForm = document.querySelector('form[name="edit-profile-form"]');
const nameInput = popupProfileEdit.querySelector('input[name="user-name"]');
const descriptionInput = popupProfileEdit.querySelector('input[name="user-description"]');
const userName = document.querySelector('h1.profile__name');
const userDescription = document.querySelector('p.profile__description');

// Functions responsible for Profile Editing

function handleEditProfileClick() {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  openPopup(popupProfileEdit);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup(popupProfileEdit);
}

// * * * MAIN CODE * * *

// Enabling validation for all forms on the site
enableValidation(validationSelectors);

// Filling the page with existing data
addExistingCards(initialCards, cardTemplate);


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
  handleCardFormSubmit(evt, popupAddCard, cardTemplate);
});

// Setting closing listeners for all popups
popups.forEach((popup) => {
  setClosePopupEventListeners(popup);
})