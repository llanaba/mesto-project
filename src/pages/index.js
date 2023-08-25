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
    setInfoProfileApi: api.updateProfileInfo.bind(api),
    setInfoAvatarApi: api.updateAvatar.bind(api),
  }
);

// Enabling validation for all forms on the site
// relation to the form validation class (FormValidator)
function validate(form) {
  const validator = new FormValidator(validationSelectors, form);
  validator.setEventListeners();
}

// Filling the page with existing data
loadInitialPage();

// * * * POPUPS * * *

// Profile Editing popup (info and avatar)

const editProfilePopup = new PopupWithForm (
  popupSelectors.editProfile,
  validate,
  {renderer: ({'user-name': name, 'user-description': about}) => {
    user.setUserInfo({'name': name, 'about': about})
  }}
);
editProfilePopup.setEventListeners();
buttons.editProfile.addEventListener('click', (evt) => {
  editProfilePopup.open();
});

const changeAvatarPopup = new PopupWithForm (
  popupSelectors.editAvatar,
  validate,
  {renderer: ({'avatar-link': avatar}) => {
    user.setUserInfo({'avatar': avatar})
  }}
);
changeAvatarPopup.setEventListeners();
buttons.changeAvatar.addEventListener('click', (evt) => {
    changeAvatarPopup.open();
  });

// Creating New Card popup

const createCardPopup = new PopupWithForm(
  popupSelectors.createCard,
  validate,
  {renderer: (card) => {
    console.log(card)
    api.postNewCard(card)
      .then((res) => {
        console.log(res)
      })
  }}
);
createCardPopup.setEventListeners();
buttons.addCard.addEventListener('click', (evt) => {
  createCardPopup.open();
});

// Viewing Image popup

const viewImagePopup = new PopupWithImage('.popup_view-image');
viewImagePopup.setEventListeners();
