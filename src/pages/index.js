import {
  config,
  userSelectors,
  popupSelectors
} from '../utils/constants.js'
import Api from '../components/Aapi.js'
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
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
              likeCardApi: api.likeCard.bind(api)
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
// Enabling validation for all forms on the site (отключила на время)
// enableValidation(validationSelectors);

// Filling the page with existing data
loadInitialPage();
console.log("I've just loaded initial page")

const createCardPopup = new PopupWithForm(
  popupSelectors.createCard,
  api.postNewCard.bind(api)
);

createCardPopup.setEventListeners();
document.querySelector('.profile__button-add').addEventListener('click', (evt) => {
  createCardPopup.open();
});