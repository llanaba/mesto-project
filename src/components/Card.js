import { cardSelectors } from "../utils/constants";
export default class Card {
  constructor(
    {_id, name, link, owner, likes},
    cardTemplateSelector,
    { deleteCardApi, likeCardApi }
  ) {
    this._selector = cardTemplateSelector

    this._cardId = _id;
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._likes = likes;

    this._deleteCard = deleteCardApi;
    this._likeCard = likeCardApi;
  }

  // пользуясь селектором template-элемента, создает пустой элемент карточки
  // и возвращает его
  _getElement() {
    const cardElement = document.querySelector(this._selector).content
      .querySelector('.card').cloneNode(true);
    return cardElement
  }

  _userLikesCard (userId) {
    if (this._likes) {
      const userLikes = this._likes.some(function(fan) {
        return fan._id === userId
      });
      return userLikes
    }
    return false
  }

  _handleDeleteClick () {
    this._deleteCard(this._cardId)
      .then((res) => {
        this._element.remove();
      });
  }

  _handleLikeClick(evt, cardId) {
    let method
    if (evt.target.classList.contains('card__button-like_active')) {
      method = 'DELETE'
    } else {
      method = 'PUT'
    }
    this._likeCard(cardId, method)
      .then((cardData) => {
        const likes = evt.target.nextElementSibling;
        likes.textContent = cardData.likes.length;
        evt.target.classList.toggle('card__button-like_active');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Пока здесь стоит заглушка, проверяющая, работает ли установка слушателей
  _setEventListeners() {
    this._buttonLikeElement.addEventListener('click', (evt) => {
        this._handleLikeClick(evt, this._cardId)
      }
    )
    this._buttonBinElement.addEventListener('click', (evt) => {
      this._handleDeleteClick();
    })
  }
  // возвращает полностью готовый элемент карточки
  generate({ _id: userId }) {
    this._element = this._getElement();

    // отрисовываем то, что не зависит от юзера
    this._element.querySelector(cardSelectors.cardName).textContent = this._name;
    this._element.querySelector(cardSelectors.cardImage).src = this._link;
    this._element.querySelector(cardSelectors.cardImage).alt = this._name;
    this._element.querySelector(cardSelectors.likeCounter).textContent = this._likes.length;

    // ищем кнопки для карточки
    this._buttonBinElement = this._element.querySelector(cardSelectors.buttonBin)
    this._buttonLikeElement = this._element.querySelector(cardSelectors.buttonLike)

    // отрисовываем сердечко в зависимости от того, лайкнуто ли оно юзером
    if (this._userLikesCard(userId)) {
        this._buttonLikeElement.classList.add('card__button-like_active')
    }

    // отрисовываем корзину в зависимости от того, является ли юзер автором
    if (userId === this._owner._id || this._owner._id === undefined) {
      this._buttonBinElement.style.display = "block";
    }
    // вешаем слушалки
    this._setEventListeners();
    return this._element;
  }
}
