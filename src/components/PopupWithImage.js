import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._element.querySelector('.figure__image');
    this._caption = this._element.querySelector('.figure__caption');
	}

  // redefines parent 'open' method: adds image and caption to the popup
  open (name, img) {
    this._image.src = img;
    this._image.alt = name;
    this._caption.textContent = name;

    this._image.onload = super.open();
  }
}
