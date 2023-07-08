const popupSection = document.querySelector('.popup.page__section');
const editProfileButton = document.querySelector('.profile__button-edit');
const closeButton = document.querySelector('.popup__button-close');
const userField = popupSection.querySelector('input[name="user-name"]');
const descriptionField = popupSection.querySelector('input[name="user-description"]');
let userName = document.querySelector('h1.profile__name');
let userDescription = document.querySelector('p.profile__description');

editProfileButton.addEventListener('click', editProfilePopup);
closeButton.addEventListener('click', closeEditProfilePopup);

console.log(userName.textContent);
console.log(userName.textContent);

function closeEditProfilePopup() {
  popupSection.classList.remove('popup_opened');
}

function editProfilePopup() {
  userField.value = userName.textContent;
  descriptionField.value = userDescription.textContent;
  popupSection.classList.add('popup_opened');
}