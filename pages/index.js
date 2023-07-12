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

function addExistingCards(cardList) {
  for (let i = 0; i < cardList.length; i++) {
    const cardData = {
      name: cardList[i]['name'],
      link: cardList[i]['link']
    }
    renderCard(cardData);
  }
}

function renderCard(cardData) {
  existingCards.prepend(createCard(cardData))
}

function createCard(cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('h2').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  const cardImageElement = cardElement.querySelector('.card__image');
  const buttonLikeElement = cardElement.querySelector('.card__button-like');
  const buttonBinElement = cardElement.querySelector('.card__button-bin');
  buttonLikeElement.addEventListener('click', handleLikeClick);
  buttonBinElement.addEventListener('click', handleRemoveCardClick);
  cardImageElement.addEventListener('click', function() {
    viewImagePopup(cardImageElement.src, cardElement.querySelector('h2'));
  });
  return cardElement
}

function handleRemoveCardClick(evt) {
  evt.target.closest('.card').remove();
}

function handleLikeClick(evt) {
  evt.target.classList.toggle('card__button-like_active');
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
  const cardData = {
    name: placeInput.value,
    link: imgLinkInput.value
  }
  createCard(cardData);
  closeAddCardPopup();
}

function viewImagePopup(imgLink, caption) {
  const imageElement = cardImageTemplate.querySelector('.popup__container_fullscreen').cloneNode(true);
  imageElement.querySelector('figcaption').textContent = caption.textContent;
  imageElement.querySelector('.figure__image').src = imgLink;
  const buttonCloseElement = imageElement.querySelector('.popup__button-close');
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