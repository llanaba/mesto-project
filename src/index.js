import './pages/index.css'
import { initialCards } from './components/cards.js';
// * * * VARIABLES * * *

// Popup windows
const popupProfileEdit = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupViewImage = document.querySelector('.popup_view-image');

// Edit profile buttons
const editProfileButton = document.querySelector('.profile__button-edit');
const closeProfileButton = popupProfileEdit.querySelector('.popup__button-close');

// Edit profile form, fields and values
const editProfileForm = document.querySelector('form[name="edit-profile-form"]');
const nameInput = popupProfileEdit.querySelector('input[name="user-name"]');
const descriptionInput = popupProfileEdit.querySelector('input[name="user-description"]');
const userName = document.querySelector('h1.profile__name');
const userDescription = document.querySelector('p.profile__description');

// Card-related buttons and template
const addCardForm = document.querySelector('form[name="new-card-form"]');
const cardTemplate = document.querySelector('#card').content;
const addCardButton = document.querySelector('.profile__button-add');
const closeAddCardButton = popupAddCard.querySelector('.popup__button-close');
const placeInput = popupAddCard.querySelector('input[name="place-name"]');
const imgLinkInput = popupAddCard.querySelector('input[name="place-link"]');
const closeImageButton = popupViewImage.querySelector('.popup__button-close');

const existingCards = document.querySelector('.cards__list');


// * * * VALIDATION * * *

const formElement = addCardForm
console.log(placeInput.id)
const formError = addCardForm.querySelector(`.${placeInput.id}-error`);
console.log(formError.textContent)

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input-text_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input-text_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input-text'));
  const buttonElement = formElement.querySelector('.popup__button-save');

  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button-save_disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button-save_disabled');
  }
}

enableValidation();


// * * * FUNCTIONS * * *

// General functions for popups

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

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

// Functions responsible for Card Editing (add, like, delete)

function addExistingCards(cardList) {
  for (let i = 0; i < cardList.length; i++) {
    const cardData = {
      name: cardList[i]['name'],
      link: cardList[i]['link']
    }
    renderCard(cardData);
  }
}

function renderCard(cardData) {
  existingCards.prepend(createCard(cardData))
}

function createCard(cardData) {
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

function handleAddCardClick() {
  openPopup(popupAddCard);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: placeInput.value,
    link: imgLinkInput.value
  }
  renderCard(cardData);
  evt.target.reset()
  closePopup(popupAddCard);
}

// Functions responsible for Viewing Images

function handleViewImageClick(imgLink, caption) {
  const imageElement = document.querySelector('.popup__container_fullscreen')
  imageElement.querySelector('.figure__image').src = imgLink;
  imageElement.querySelector('figcaption').textContent = caption.textContent;
  // imageElement.closest('.popup_view-image').addEventListener('click', function () {
  //   closePopup(imageElement.closest('.popup_view-image'));
  // })
  openPopup(popupViewImage);
}


// * * * BUTTON AND FORM LISTENERS * * *

// Edit Profile Form: opening, closing, submitting
editProfileButton.addEventListener('click', handleEditProfileClick);
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
closeProfileButton.addEventListener('click', function() {
  closePopup(popupProfileEdit);
});

// Adding Card Form: opening, closing, submitting
addCardButton.addEventListener('click', handleAddCardClick);
addCardForm.addEventListener('submit', handleCardFormSubmit);
closeAddCardButton.addEventListener('click', function() {
  closePopup(popupAddCard);
});

// View Image: closing
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

// Filling the page with existing data
addExistingCards(initialCards);

