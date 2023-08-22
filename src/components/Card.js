export default class Card {
  constructor(cardData, cardTemplateSelector) {
    this._selector = cardTemplateSelector
    this._cardData = cardData

  }

  // пользуясь селектором template-элемента, создает пустой элемент карточки
  // и возвращает его
  _getElement() {
    const cardElement = document.querySelector(this._selector).content
      .querySelector('.card').cloneNode(true);
    return cardElement
  }

  // возвращает полностью готовый элемент карточки
  generate() {
    this._element = this._getElement();
    this._element.querySelector('h2').textContent = this._cardData.name;
    this._element.querySelector('.card__image').src = this._cardData.link;
    return this._element
  }
}