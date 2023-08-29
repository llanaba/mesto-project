export default class FormValidator {
  constructor ({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, form) {
    this._inputList = [...form.querySelectorAll(inputSelector)]; // array of input form elements
    this._submitButton = form.querySelector(submitButtonSelector); // submit button element
    this._inactiveButtonClass = inactiveButtonClass; // the class of the active submit button
    this._inputErrorClass = inputErrorClass; // invalid input field class
    this._errorClass = errorClass; // comment class for invalid input field
    this._form = form; // form element
  }

  // checking all inputs for validity
  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // enabling and disabling the submit button
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  // output of the input error message
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // hiding the input error message
  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // validation of input
  _isValid (inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // method for removing error messages from the form
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }

  // disabling the listener for each input with validation + enabling and disabling the submit button
  enableValidation () {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }
}
