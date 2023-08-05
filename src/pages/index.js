import './index.css'

import { enableValidation, toggleButtonState } from '../components/validate.js';
import { openPopup, closePopup } from '../components/modal.js';
import {
  handleAddCardClick,
  handleCardFormSubmit,
  renderInitialCards,
  confirmDeletion,
  } from '../components/cards.js';

import { setClosePopupEventListeners } from '../components/modal.js';

import {
  getUser,
  updateProfileInfo,
  updateAvatar,
  renderLoading,
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
const popupAvatarEdit = document.querySelector('.popup_edit-avatar');

// Card-related buttons and template
const addCardForm = document.querySelector('form[name="new-card-form"]');
const addCardButton = document.querySelector('.profile__button-add');
const deleteCardForm = document.querySelector('form[name="confirm-delete-form"]')

// Profile-related buttons, form, fields and values
const editProfileButton = document.querySelector('.profile__button-edit');
const editProfileForm = document.querySelector('form[name="edit-profile-form"]');
const editProfileSubmitButton = editProfileForm.querySelector('.popup__button-save');
const editProfileSubmitButtonOrigText = editProfileSubmitButton.textContent;
const editAvatarButton = document.querySelector('.profile__avatar-overlay');
const editAvatarForm = document.querySelector('.form[name="edit-avatar-form"]');
const editAvatarSubmitButton = editAvatarForm.querySelector('.popup__button-save')
const editAvatarSubmitButtonOrigText = editAvatarSubmitButton.textContent;
const avatarInput = popupAvatarEdit.querySelector('input[name="avatar-link"]');
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
  renderLoading(true, editProfileSubmitButton)
  updateProfileInfo(nameInput.value, descriptionInput.value)
    .then(() => {
      renderUserInfo('me');
    })
    .then(() => {
      renderLoading(false, editProfileSubmitButton, editProfileSubmitButtonOrigText)
      closePopup(popupProfileEdit);
    })
    .catch((err) => {
      console.log(err);
    })
}

function handleEditAvatarClick() {
  openPopup(popupAvatarEdit);
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, editAvatarSubmitButton);
  updateAvatar(avatarInput.value)
    .then(() => {
      renderUserInfo('me')
    })
    .then(() => {
      renderLoading(false, editAvatarSubmitButton, editAvatarSubmitButtonOrigText)
      editAvatarForm.reset();
      toggleButtonState([avatarInput], editAvatarSubmitButton, 'popup__button-save_disabled')
      closePopup(popupAvatarEdit);
    })
    .catch((err) => {
      console.log(err);
    })
}

function loadInitialPage() {
  getUser('me')
  .then((userData) => {
    renderInitialCards(userData._id);
  })
  .catch((err) => {
    console.log(err);
  })
}

function renderUserInfo(userId) {
  getUser(userId)
  .then((userData) => {
    userName.textContent = userData.name
    userDescription.textContent = userData.about
    userAvatar.src = userData.avatar
  })
  .catch((err) => {
    console.log(err);
  })
}

// * * * MAIN CODE * * *

// Enabling validation for all forms on the site
enableValidation(validationSelectors);

// Getting and rendering info about the current user
renderUserInfo('me');

// Filling the page with existing data
loadInitialPage();


// * * * BUTTON AND FORM LISTENERS * * *

// Edit Profile Form: opening, closing, submitting
editProfileButton.addEventListener('click', handleEditProfileClick);
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
editAvatarButton.addEventListener('click', handleEditAvatarClick);
editAvatarForm.addEventListener('submit', handleEditAvatarFormSubmit);

// Adding Card Form: opening, closing, submitting
addCardButton.addEventListener('click', function() {
  handleAddCardClick(popupAddCard);
});
addCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  handleCardFormSubmit(evt, popupAddCard);
});

// Deleting Card Form
deleteCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  confirmDeletion();
})

// Setting closing listeners for all popups
popups.forEach((popup) => {
  setClosePopupEventListeners(popup);
})
