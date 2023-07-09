const popupSection = document.querySelector('.popup.page__section');

const editProfileButton = document.querySelector('.profile__button-edit');
const closeButton = document.querySelector('.popup__button-close');
const saveButton = document.querySelector('.popup__button-save');

const editProfileForm = document.querySelector('form[name="edit-form"]');
const nameInput = popupSection.querySelector('input[name="user-name"]');
const descriptionInput = popupSection.querySelector('input[name="user-description"]');

const userName = document.querySelector('h1.profile__name');
const userDescription = document.querySelector('p.profile__description');

editProfileButton.addEventListener('click', editProfilePopup);
closeButton.addEventListener('click', closeEditProfilePopup);
saveButton.addEventListener('click', handleFormSubmit);

function closeEditProfilePopup() {
  popupSection.classList.remove('popup_opened');
}

function editProfilePopup() {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  popupSection.classList.add('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closeEditProfilePopup();
}