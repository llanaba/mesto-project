export default class Card {
  constructor({_id, name, link, owner, likes}, cardTemplateSelector) {
    console.log("I'm insde class Card constructor")
    this._selector = cardTemplateSelector
    this._cardId = _id;
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._likes = likes;
  }

  // пользуясь селектором template-элемента, создает пустой элемент карточки
  // и возвращает его
  _getElement() {
    console.log("I'm inside _getElement()")
    const cardElement = document.querySelector(this._selector).content
      .querySelector('.card').cloneNode(true);
    return cardElement
  }

  _userLikesCard (userId, cardFans) {
    if (cardFans) {
      const userLikes = cardFans.some(function(fan) {
        return fan._id === userId
      });
      return userLikes
    }
    return false
  }

  // Пока здесь стоит заглушка, проверяющая, работает ли установка слушателей
  _setEventListeners() {
    // this._buttonLikeElement = this._element.querySelector('.card__button-like')
    this._buttonLikeElement.addEventListener(
      'click', () => {
        console.log('YOU CLICKED')
        this._element.querySelector('.card__button-like').classList.add('card__button-like_active')
      }
    )
  }
  // возвращает полностью готовый элемент карточки
  generate(userData) {
    console.log("I'm inside generate")
    console.log(this._name)
    this._element = this._getElement();
    // отрисовываем то, что не зависит от юзера
    this._element.querySelector('h2').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__like-counter').textContent = this._likes.length;

    // ищем кнопки для карточки
    this._buttonBinElement = this._element.querySelector('.card__button-bin')
    this._buttonLikeElement = this._element.querySelector('.card__button-like')

    // отрисовываем сердечко в зависимости от того, лайкнуто ли оно юзером
    if (this._userLikesCard(userData._id, this._likes)) {
        this._buttonLikeElement.classList.add('card__button-like_active')
    }
    // отрисовываем корзину в зависимости от того, является ли юзер автором
    if (userData._id === this._owner._id || this._owner._id === undefined) {
      this._buttonBinElement.style.display = "block";
    }
    // вешаем слушалки
    this._setEventListeners();
    return this._element
  }
}
