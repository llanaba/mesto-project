export default class Card {
  constructor({_id, name, link, owner, likes}, cardTemplateSelector) {
    console.log("I'm insde class Card constructor")
    this._selector = cardTemplateSelector
    console.log(cardTemplateSelector)
    console.log(document.querySelector('#card'))
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
    console.log(document.querySelector(this._selector))
    console.log(document.querySelector('#card'))
    const cardElement = document.querySelector(this._selector).content
      .querySelector('.card').cloneNode(true);
    return cardElement
  }

  // возвращает полностью готовый элемент карточки
  generate() {
    console.log("I'm inside generate")
    console.log(document.querySelector('#card'))
    console.log(this._name)
    this._element = this._getElement();
    this._element.querySelector('h2').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__like-counter').textContent = this._likes.length;
    // this._setEventListeners();
    return this._element
  }
}
