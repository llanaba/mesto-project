import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (selector) {
    super(selector);
    this._image = this._popupElement.querySelector('.figure__image'); // link to the image for the popup
    this._caption = this._popupElement.querySelector('.figure__caption'); // image descriptions
	}

  // resetting image information
  _resetInfo () {
    this._image.src = '';
    this._image.alt = '';
    this._caption.textContent = '';
  }

  // redefines parent 'open' method: adds image and caption to the popup
  open (name, img) {
    this._image.src = img;
    this._image.alt = name;
    this._caption.textContent = name;

    // code example with .onload
    //const openPopup = () => super.open();
    //this._image.onload = function () {
    //  openPopup();
    //}

    super.open();
  }

  // closing the popup and resetting the image information
  close () {
    super.close();
    this._resetInfo();
  }
}
