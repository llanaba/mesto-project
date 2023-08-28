import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, { handleSubmit }) {
    super(selector);
    this._handleSubmit = handleSubmit; // the submit function of the form
    this._inputList = [...this._form.querySelectorAll('.form__input-text')];
    this._buttonSubmit = this._popupElement.querySelector('.popup__button-save');
    this._buttonSubmitText = this._buttonSubmit.textContent;
	}

  // getting data from input fields
  _getInputValues () {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  // enabling and disabling the upload status for the submit button
  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._buttonSubmit.textContent = loadingText;
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }

  // setting input fields
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
      this._handleSubmit(this._getInputValues());
    });
  }

  // close popup
  close () {
    super.close();
    this._form.reset();
    this.renderLoading(false);
  }
}