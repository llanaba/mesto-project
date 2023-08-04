const showInputError = (formElement, inputElement, errorMessage, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};

const hideInputError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, selectors) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
}

const setEventListeners = (formElement, selectors) => {
  console.log("I'm inside setEventListeners")
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  console.log(inputLIst)
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  console.log(buttonElement)

  toggleButtonState(inputList, buttonElement, selectors.inactiveButtonClass);
  console.log("I'm inside toggleButtonState in setEventListeners")
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors.inactiveButtonClass);
    });
  });
};

export const enableValidation = ({formSelector, ...selectors}) => {
  console.log("I'm inside enableValidation")
  const formList = Array.from(document.querySelectorAll(formSelector));
  console.log(formList)
  formList.forEach((formElement) => {
    console.log(`This form is processed: ${formElement}`)
    setEventListeners(formElement, selectors);
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

export const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}