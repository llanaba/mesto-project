import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit, validate = '') {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._element.querySelector('.form');
    if (typeof validate === 'function') {
      validate(this._form);
    }
	}

  // getting information from input fields
  _getInputValues () {
    console.log("I'm inside _getInputValues")
    this._inputList = [...this._form.querySelectorAll('.form__input-text')];

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  // adding event handlers
  setEventListeners () {
    console.log("I'm in setEventListeners of PopupWithForm.js")
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
        .then((res) => {
          // res - это данные новой карточки
          console.log(res)
        })
      this._form.reset();
      this.close();
      if (this._form.name === 'new-card-form') {
        console.log("It's card form!")
      }
    });
  }

  // close popup
  close () {
    super.close();
    this._form.reset();
  }
}