// Popup windows
const popupProfileEdit = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupViewImage = document.querySelector('.popup_view-image');

// Edit profile buttons
const editProfileButton = document.querySelector('.profile__button-edit');
const closeProfileButton = popupProfileEdit.querySelector('.popup__button-close');

// Edit profile form, fields and values
const editProfileForm = document.querySelector('form[name="edit-profile-form"]');
const nameInput = popupProfileEdit.querySelector('input[name="user-name"]');
const descriptionInput = popupProfileEdit.querySelector('input[name="user-description"]');
const userName = document.querySelector('h1.profile__name');
const userDescription = document.querySelector('p.profile__description');

// Adding card buttons and template
const addCardForm = document.querySelector('form[name="new-card-form"]');
const cardTemplate = document.querySelector('#card').content;
const cardImageTemplate = document.querySelector('#image').content;
const addCardButton = document.querySelector('.profile__button-add');
const closeAddCardButton = popupAddCard.querySelector('.popup__button-close');
const placeInput = popupAddCard.querySelector('input[name="place-name"]');
const imgLinkInput = popupAddCard.querySelector('input[name="place-link"]');

const existingCards = document.querySelector('.cards__list');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addExistingCards(cardList) {
  for (let i = 0; i < cardList.length; i++) {
    addCard(cardList[i]['name'], cardList[i]['link']);
  }
}

function addCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('h2').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  let cardImageElement = cardElement.querySelector('.card__image');
  let buttonLikeElement = cardElement.querySelector('.card__button-like');
  let buttonBinElement = cardElement.querySelector('.card__button-bin');
  buttonLikeElement.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__button-like_active');
  })
  buttonBinElement.addEventListener('click', function(evt) {
    let binButton = evt.target
    let binCard = binButton.parentElement;
    binCard.remove();
  })
  cardImageElement.addEventListener('click', function() {
    viewImagePopup(cardImageElement.src, cardElement.querySelector('h2'));
  });
  existingCards.prepend(cardElement);
}

function closeEditProfilePopup() {
  popupProfileEdit.classList.remove('popup_opened');
}

function editProfilePopup() {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  popupProfileEdit.classList.add('popup_opened');
}

function handleFormSubmit(evt) {
  console.log('Im here')
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closeEditProfilePopup();
}

function addCardPopup() {
  popupAddCard.classList.add('popup_opened');
}

function closeAddCardPopup() {
  popupAddCard.classList.remove('popup_opened');
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  addCard(placeInput.value, imgLinkInput.value);
  closeAddCardPopup();
}

function viewImagePopup(imgLink, caption) {
  console.log(imgLink);
  const imageElement = cardImageTemplate.querySelector('.popup__container_fullscreen').cloneNode(true);
  imageElement.querySelector('figcaption').textContent = caption.textContent;
  imageElement.querySelector('.figure__image').src = imgLink;
  let buttonCloseElement = imageElement.querySelector('.popup__button-close');
  buttonCloseElement.addEventListener('click', function(evt) {
    buttonCloseElement.parentElement.remove();
    popupViewImage.classList.remove('popup_opened');
  })
  popupViewImage.appendChild(imageElement);
  popupViewImage.classList.add('popup_opened');
}

// Buttons and forms listeners
editProfileButton.addEventListener('click', editProfilePopup);
closeProfileButton.addEventListener('click', closeEditProfilePopup);
editProfileForm.addEventListener('submit', handleFormSubmit);

addCardButton.addEventListener('click', addCardPopup);
closeAddCardButton.addEventListener('click', closeAddCardPopup);
addCardForm.addEventListener('submit', handleCardFormSubmit);

addExistingCards(initialCards);