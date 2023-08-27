import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (selector) {
    super(selector);
    this._image = this._popupElement.querySelector('.figure__image'); // link to the image for the popup
    this._caption = this._popupElement.querySelector('.figure__caption'); // image descriptions
	}

  // redefines parent 'open' method: adds image and caption to the popup
  open (name, img) {
    this._image.src = img;
    this._image.alt = name;
    this._caption.textContent = name;

    super.open();
  }
}
