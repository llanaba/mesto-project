export default class Popup {
  constructor (selector) {
    this._popupElement = document.querySelector(selector);
    this._form = this._popupElement.querySelector('.form');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._buttonClose = this._popupElement.querySelector('.popup__button-close');
  }

  // closing by pressing Esc
  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // closing by clicking on the overlay
  _handleOverlayClose (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  // adding event handlers
  setEventListeners () {
    this._popupElement.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    });
    this._buttonClose.addEventListener('click', (evt) => {
      this.close();
    });
  }

  // open popup
  open () {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // close popup
  close () {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}