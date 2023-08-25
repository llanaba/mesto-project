export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27',
  headers: {
    authorization: 'f064128c-9ee2-488b-af8c-42d65f638aa9',
    'Content-Type': 'application/json'
  }
}

export const userSelectors = {
  'nameSelector': 'h1.profile__name',
  'infoSelector': 'p.profile__description',
  'avatarSelector': '.profile__avatar'
}

export const popupSelectors = {
  'createCard': '.popup_add-card',
  'editProfile': '.popup_edit-profile',
  'editAvatar': '.popup_edit-avatar',
}

export const cardSelectors = {
  'cardName': '.card__text',
  'cardImage': '.card__image',
  'likeCounter': '.card__like-counter',
  'buttonBin': '.card__button-bin',
  'buttonLike': '.card__button-like'
}

export const validationSelectors = {
  inputSelector: '.form__input-text',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'form__input-text_error',
  errorClass: 'form__input-error_active'
}

export const buttons = {
  'addCard': document.querySelector('.profile__button-add'),
  'editProfile': document.querySelector('.profile__button-edit'),
  'changeAvatar': document.querySelector('.profile__avatar-overlay'),
}