const popupSection = document.querySelector('.popup.page__section');
const editProfileButton = document.querySelector('.profile__button-edit');
const closeButton = document.querySelector('.popup__button-close');

editProfileButton.addEventListener('click', editProfilePopup);
closeButton.addEventListener('click', closeEditProfilePopup);

// popupSection.classList.toggle('popup_opened')
console.log(popupSection);
console.log(closeButton);

function closeEditProfilePopup() {
  popupSection.classList.remove('popup_opened');
}

function editProfilePopup() {
  popupSection.classList.add('popup_opened');
}