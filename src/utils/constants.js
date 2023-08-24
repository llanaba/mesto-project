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
  'editProfile': '.popup_edit-profile'
}

export const cardSelectors = {
  'cardName': '.card__text',
  'cardImage': '.card__image',
  'likeCounter': '.card__like-counter',
  'buttonBin': '.card__button-bin',
  'buttonLike': '.card__button-like'
}

export const buttons = {
  'addCard': document.querySelector('.profile__button-add')
}