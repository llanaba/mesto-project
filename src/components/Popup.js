export default class Popup {
  constructor (selector) {
    this._selector = selector; // the popup selector
    this._element = document.querySelector(this._selector); // the popup element
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
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._element.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    });
    this._element.querySelector('.popup__button-close').addEventListener('click', (evt) => {
      this.close();
    });
  }

  // open popup
  open () {
    this._element.classList.add('popup_opened');
  }

  // close popup
  close () {
    this._element.classList.remove('popup_opened');
  }
}