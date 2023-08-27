import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, { handleSubmit }) {
    super(selector);
    this._handleSubmit = handleSubmit; // the submit function of the form
    this._inputList = [...this._form.querySelectorAll('.form__input-text')];
    this._buttonSubmitText = this._buttonSubmit.textContent
	}

  // getting data from input fields
  _getInputValues () {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._buttonSubmit.textContent = loadingText;
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // adding event handlers
  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const resSubmit = this._handleSubmit(this._getInputValues());
      if (resSubmit) {
        resSubmit
          .then((res) => {
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