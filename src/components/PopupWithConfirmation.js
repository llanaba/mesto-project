import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor (selector, { deleteCardApi }) {
    super(selector);
    this._deleteCard = deleteCardApi;
    this._form = this._element.querySelector('.form');
  }
  
  // setting an item to delete
  callBackDeleteItem (data) {
    this._data = data;
  }

  // adding event handlers
  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteCard(this._data._cardId)
        .then(() => {
          this._data._element.remove();
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}