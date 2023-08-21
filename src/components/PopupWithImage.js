import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._selector.querySelector('.figure__image');
    this._caption = this._selector.querySelector('.figure__caption');
	}

  // open popup
  open (name, img) {
    this._image.src = img;
    this._image.alt = name;
    this._caption.textContent = name;
    
    this._image.src.onload = function () {
      super.open();
    }
  }
}