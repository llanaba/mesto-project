import Card from '../components/Card.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Aapi.js'
import {
  config,
  userSelectors
} from '../utils/constants.js'

import './index.css'

// * * * VARIABLES AND FUNCTIONS * * *

// Функция, ответственная за загрузку страницы
function loadInitialPage() {
  console.log("I'm inside loadInitialPage")
  // Теперь данные юзера - это экземпляр класса UserInfo
  // При создании экземпляра передаем селекторы, нужные для профиля и два метода api
  // Оба метода привязываем к api через bind, чтобы не потерять контекст
  const user = new UserInfo(
    userSelectors,
    api.getUser.bind(api),
    api.updateProfileInfo.bind(api))
  Promise.all([
    user.getUserInfo(),
    api.getInitialCards()
  ])
    .then((values) => {
      let [userData, cardsData] = values;
      console.log("I'm about to render user profile on page")
      // для отображения данных на странице используется renderUserInfo —
      // этот метод не ходит на сервер, просто отрисовывает данные на странице
      user.renderUserInfo(userData)
      console.log("I'm about to make initialCardList")
      // карточки теперь - экземпляр класса Section, добавляются по тому же принципу, как
      // в интернет-магазине роботов из тренажера
      const initialCardList = new Section({
        items: cardsData,
        renderer: (item) => {
          console.log("I'm inside renderer in index.js")
          const card = new Card(item, '#card');
          console.log("card inside renderer in loadInitialPage: ")
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
// Enabling validation for all forms on the site (отключила на время)
// enableValidation(validationSelectors);

// Filling the page with existing data
loadInitialPage();
