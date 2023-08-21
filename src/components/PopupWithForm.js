import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._selector.querySelector('.form');
	}

  // getting information from input fields
  _getInputValues() {
    this._inputList = this._selector.querySelectorAll('.form__input');
    
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    
    return this._formValues;
  }

  // adding event handlers
  setEventListeners () {
    super.setEventListeners();
    this._selector.querySelector('.form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset();
    });
  }

  // close popup
  close () {
    super.close();
    this._form.reset();
  }
}