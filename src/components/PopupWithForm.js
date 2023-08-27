import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, { submit }) {
    super(selector);
    this._submit = submit; // the submit function of the form
    this._form = this._popupElement.querySelector('.form'); // form element in the popup
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
      const rezSubmit = this._submit(this._getInputValues());
      if (rezSubmit) {
        rezSubmit
          .then((rez) => {
            this._form.reset();
            this.close();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  // close popup
  close () {
    super.close();
    this._form.reset();
  }
}