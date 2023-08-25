import {
  config,
  userSelectors,
  popupSelectors,
  validationSelectors,
  buttons
} from '../utils/constants.js'
import Api from '../components/Api.js'
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import './index.css'

// * * * VARIABLES AND FUNCTIONS * * *


// Функция, ответственная за загрузку страницы
function loadInitialPage() {
  console.log("I'm inside loadInitialPage")

  Promise.all([
    user.getUserInfo(),
    api.getInitialCards()
  ])
    .then((values) => {
      let [userData, cardsData] = values;
      const initialCardList = new Section({
        items: cardsData,
        renderer: (item) => {
          // console.log("I'm inside renderer in index.js")
          const card = new Card(
            item,
            '#card',
            {
              deleteCardApi: api.deleteCard.bind(api),
              likeCardApi: api.likeCard.bind(api),
              openViewImagePopup: (name, link) => {viewImagePopup.open(name, link)}
              // appendCard: initialCardList.addItem.bind(initialCardList)
            });
          const cardElement = card.generate(userData, api);
          initialCardList.addItem(cardElement);
        }
      }, '.cards__list');
      initialCardList.renderItems();
    })
    .catch((err) => {
      console.log(err);
    })
}

// * * * MAIN CODE * * *

const api = new Api(config)
const user = new UserInfo(
  userSelectors,
  {
    getInfoApi: api.getUser.bind(api),
    setInforProfileApi: api.updateProfileInfo.bind(api),
    setInfoAvatarApi: api.updateAvatar.bind(api),
  }
);

// relation to the form validation class (FormValidator)
function validate(form) {
  const validator = new FormValidator(validationSelectors, form);
  validator.setEventListeners();
}
// Enabling validation for all forms on the site (отключила на время)
// enableValidation(validationSelectors);

// Filling the page with existing data
loadInitialPage();
console.log("I've just loaded initial page")

// * * * POPUPS * * *

// Profile Editing popup (info and avatar)

const editProfilePopup = new PopupWithForm (
  popupSelectors.editProfile,
  api.updateProfileInfo.bind(api),
  validate
  );
editProfilePopup.setEventListeners();
buttons.editProfile.addEventListener('click', (evt) => {
  editProfilePopup.open();
});

const changeAvatarPopup = new PopupWithForm (
  popupSelectors.editAvatar,
  api.updateAvatar.bind(api),
  validate);
changeAvatarPopup.setEventListeners();
buttons.changeAvatar.addEventListener('click', (evt) => {
    changeAvatarPopup.open();
  });

// Creating New Card popup

const createCardPopup = new PopupWithForm(
  popupSelectors.createCard,
  api.postNewCard.bind(api),
  validate
);
createCardPopup.setEventListeners();
buttons.addCard.addEventListener('click', (evt) => {
  createCardPopup.open();
});

// Viewing Image popup

const viewImagePopup = new PopupWithImage('.popup_view-image');
viewImagePopup.setEventListeners();
