import {
  config,
  userSelectors,
  popupSelectors,
  validationSelectors,
  buttons,
  nameForms
} from '../utils/constants.js'
import Api from '../components/Api.js'
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from '../components/FormValidator.js';
import './index.css'

// * * * VARIABLES AND FUNCTIONS * * *

let initialCardList; // storage for photo cards
let user; // storage for user data
const api = new Api(config); // a class for working with the server
const formValidators = {}; // Enabling validation for all forms on the site

// creating a profile editing popup
const editProfilePopup = new PopupWithForm (
  popupSelectors.editProfile,
  { handleSubmit: handleProfileFormSubmit }
);

// creating a popup for changing the user's avatar
const changeAvatarPopup = new PopupWithForm (
  popupSelectors.editAvatar,
  { handleSubmit: handleAvatarFormSubmit }
);

// creating a pop-up for creating a photo card
const createCardPopup = new PopupWithForm (
  popupSelectors.createCard,
  { handleSubmit: handleCardFormSubmit }
);

// creating a pop-up for opening an image of a photo card
const viewImagePopup = new PopupWithImage(popupSelectors.viewImage);

// confirmation of photo card deletion
const deleteCardPopup = new PopupWithConfirmation (
  popupSelectors.deleteCard,
  { deleteCardApi: api.deleteCard.bind(api) }
);

// the general logic of the submit button
function handleSubmit (request, popupInstance, loadingText = 'Сохранение...') {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close()
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

// submit profile changes
function handleProfileFormSubmit (inputValues) {
  function makeRequest() {
    return api.updateProfileInfo(inputValues['user-name'], inputValues['user-description'])
      .then((updatedData) => {
      user.setUserInfo(updatedData);
    });
  }
  handleSubmit(makeRequest, editProfilePopup);
}

// submit avatar changes
function handleAvatarFormSubmit (inputValues) {
  function makeRequest() {
    return api.updateAvatar(inputValues['avatar-link'])
      .then((updatedData) => {
      user.setUserInfo(updatedData);
    });
  }
  handleSubmit(makeRequest, changeAvatarPopup);
}

// submit photo creation
function handleCardFormSubmit (inputValues) {
  function makeRequest() {
    return api.postNewCard(inputValues)
      .then((cardInfo) => {
      const newCard = createCard(cardInfo);
      initialCardList.addItem(newCard);
    });
  }
  handleSubmit(makeRequest, createCardPopup);
}

// create photo card
function createCard (photoCardItem) {
  const card = new Card (
    photoCardItem,
    '#card',
    {
      deleteCard: (photoCardItem) => {
        deleteCardPopup.setItemToDelete(photoCardItem);
        deleteCardPopup.open();
      },
      likeCardApi: api.likeCard.bind(api),
      openViewImagePopup: viewImagePopup.open.bind(viewImagePopup)
    }
  );
  return card.generate(user.getUserInfo());
}

// uploading user information and drawing photo cards from the server
function loadInitialPage() {
  Promise.all([
    api.getUser(),
    api.getInitialCards()
  ])
    .then(([ userData, cardsData ]) => {
      user = new UserInfo (userSelectors);
      user.setUserInfo(userData);
      initialCardList = new Section ({
        items: cardsData,
        renderer: createCard
      }, '.cards__list');
      initialCardList.renderItems();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    });
}

// creating a form object and enabling their validation
function enableValidation (validationSelectors) {
  const formList = Array.from(document.querySelectorAll(validationSelectors.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSelectors, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}

// * * * MAIN CODE * * *

// enabling form validation
enableValidation(validationSelectors);

// Filling the page with existing data
loadInitialPage();

// * * * POPUPS * * *

// Profile Editing popup (info and avatar)
editProfilePopup.setEventListeners(); // enabling event handlers
buttons.editProfile.addEventListener('click', (evt) => {
  formValidators[nameForms.editProfile].resetValidation();
  const userData = user.getUserInfo();
  editProfilePopup.setInputValues({ 'user-name': userData.name, 'user-description': userData.about });
  editProfilePopup.open(); // opening of the popup
});

// change Avatar Popup
changeAvatarPopup.setEventListeners(); // enabling event handlers
buttons.changeAvatar.addEventListener('click', (evt) => {
  formValidators[nameForms.editAvatar].resetValidation();
  changeAvatarPopup.open(); // opening of the popup
});

// Creating New Card popup
createCardPopup.setEventListeners(); // enabling event handlers
buttons.addCard.addEventListener('click', (evt) => {
  formValidators[nameForms.createCard].resetValidation();
  createCardPopup.open(); // opening of the popup
});

// Viewing Image popup
viewImagePopup.setEventListeners(); // enabling event handlers

// delete Card Popup
deleteCardPopup.setEventListeners(); // enabling event handlers
