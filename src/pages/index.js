import Card from '../components/Card.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Aapi.js'
import {
  config
} from '../utils/constants.js'
// старые импорты

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

// import {
//   getUser,
//   updateProfileInfo,
//   updateAvatar,
//   renderLoading,
//   getInitialCards,
//   } from '../components/api.js';

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

// ОБНОВЛЕННАЯ ФУНКЦИЯ LOADINITIALPAGE
function loadInitialPage() {
  console.log("I'm inside loadInitialPage")
  // Теперь данные юзера - это экземпляр класса UserInfo
  // В будущем селекторы надо будет закинуть в utils/constants.js для порядка
  const user = new UserInfo(
    {'nameSelector': 'h1.profile__name',
    'infoSelector': 'p.profile__description',
    'avatarSelector': '.profile__avatar'
    })
  Promise.all([
    // в этой строке передаем методу getUserInfo метод класса api
    // чтобы не потерять контекст, привязываем api через bind (1.5 часа протупила на потере контекста тут)
    user.getUserInfo(api.getUser.bind(api)),
    // другим методом api добываем карточки с сервера
    api.getInitialCards()
  ])
    .then((values) => {
      let [userData, cardsData] = values;
      // renderProfileOnPage(userData);
      console.log("I'm about to render user profile on page")
      // эта строка отображает актуальные данные в браузере. Скорее всего, тут
      // должно идти по другой логике, но пока так
      user.setUserInfo(userData)
      console.log("I'm about to make initialCardList")
      // карточки теперь - экземпляр класса Section, добавляются по тому же принципу, как
      // в интернет-магазине роботов из тренажера
      const initialCardList = new Section({
        items: cardsData,
        renderer: (item) => {
          console.log("I'm inside renderer in index.js")
          const card = new Card(item, '#card');
          console.log("card inside renderer in loadInitialPage: ")
          const cardElement = card.generate();
          initialCardList.addItem(cardElement);
        }
      }, '.cards__list');
      initialCardList.renderItems();
    })
    .catch((err) => {
      console.log(err);
    })
}

function renderUserInfo(userId) {
  getUser(userId)
  .then((userData) => {
    renderProfileOnPage(userData);
  })
  .catch((err) => {
    console.log(err);
  })
}

function renderProfileOnPage(userData) {
  userName.textContent = userData.name
  userDescription.textContent = userData.about
  userAvatar.src = userData.avatar
}
// * * * MAIN CODE * * *

const api = new Api(config)
// Enabling validation for all forms on the site
// enableValidation(validationSelectors);

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
