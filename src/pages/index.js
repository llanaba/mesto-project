import {
  config,
  userSelectors,
  popupSelectors,
  validationSelectors,
  buttons,
  timeErr,
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

// creating a profile editing popup
const editProfilePopup = new PopupWithForm (
  popupSelectors.editProfile,
  {
    handleSubmit: (data) => {
      editProfilePopup.renderLoading(true);
      const rezApi = api.updateProfileInfo(data['user-name'], data['user-description']);
      rezApi
        .then((updatedData) => {
          user.setUserInfo(updatedData);
        })
        .catch((err) => {
          console.log(err);
          createCardPopup.renderLoading(true, 'Ошибка сохранения');
          setTimeout(createCardPopup.renderLoading.bind(createCardPopup), timeErr * 1000, false);
        });
      return rezApi;
    }
  }
);

// creating a popup for changing the user's avatar
const changeAvatarPopup = new PopupWithForm (
  popupSelectors.editAvatar,
  {
    handleSubmit: (data) => {
      changeAvatarPopup.renderLoading(true);
      const rezApi = api.updateAvatar(data['avatar-link']);
      rezApi
        .then((updatedData) => {
          user.setUserInfo(updatedData);
        })
        .catch((err) => {
          console.log(err);
          changeAvatarPopup.renderLoading(true, 'Ошибка сохранения');
          setTimeout(changeAvatarPopup.renderLoading.bind(changeAvatarPopup), timeErr * 1000, false);
        });
      return rezApi;
    }
  }
);

// creating a pop-up for creating a photo card
const createCardPopup = new PopupWithForm (
  popupSelectors.createCard,
  {
    handleSubmit: (subInfoCard) => {
      createCardPopup.renderLoading(true);
      const rezApi = api.postNewCard(subInfoCard);
      rezApi
        .then((cardInfo) => {
          renderPhotoCard(cardInfo);
        })
        .catch((err) => {
          console.log(err);
          createCardPopup.renderLoading(true, 'Ошибка сохранения');
          setTimeout(createCardPopup.renderLoading.bind(createCardPopup), timeErr * 1000, false);
        });
      return rezApi;
    }
  }
);

// creating a pop-up for opening an image of a photo card
const viewImagePopup = new PopupWithImage(popupSelectors.viewImage);

// confirmation of photo card deletion
const deleteCardPopup = new PopupWithConfirmation (
  popupSelectors.deleteCard,
  { deleteCardApi: api.deleteCard.bind(api) }
);

// creating a photo card and placing it in storage
function renderPhotoCard (photoCardItem) {
  const card = new Card (
    photoCardItem,
    '#card',
    {
      deleteCard: (card) => {
        deleteCardPopup.setItemToDelete(card);
        deleteCardPopup.open();
      },
      likeCardApi: api.likeCard.bind(api),
      openViewImagePopup: viewImagePopup.open.bind(viewImagePopup)
    }
  );
  const cardElement = card.generate(user.getUserInfo());
  initialCardList.addItem(cardElement);
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
        renderer: renderPhotoCard
      }, '.cards__list');
      initialCardList.renderItems();
    })
    .catch((err) => {
      console.log(err);
    });
}

// * * * MAIN CODE * * *

// Enabling validation for all forms on the site
const formValidators = {};

function enableValidation (validationSelectors) {
  const formList = Array.from(document.querySelectorAll(validationSelectors.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSelectors, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}

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
