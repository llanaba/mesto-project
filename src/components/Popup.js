export default class Popup {
  constructor (selector) {
    this._selector = selector;
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
    this._selector.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._selector.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    });
    this._selector.querySelector('.popup__button-close').addEventListener('click', (evt) => {
      this.close();
    });
  }

  // open popup
  open () {
    this._selector.classList.add('popup_opened');
  }

  // close popup
  close () {
    this._selector.classList.remove('popup_opened');
  }
}