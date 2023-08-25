import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, validate = '', {renderer}) {
    super(selector);
    this._renderer = renderer
    this._form = this._element.querySelector('.form');
    if (typeof validate === 'function') {
      validate(this._form);
    }
	}

  // getting information from input fields
  _getInputValues () {
    this._inputList = [...this._form.querySelectorAll('.form__input-text')];

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  // adding event handlers
  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._renderer(this._getInputValues())
      this._form.reset();
      this.close();
      }
    );
  }

  // close popup
  close () {
    super.close();
    this._form.reset();
  }
}