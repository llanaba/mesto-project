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
  const cardTitleElement = cardElement.querySelector('h2');
  const cardImageElement = cardElement.querySelector('.card__image');
  const buttonLikeElement = cardElement.querySelector('.card__button-like');
  const buttonBinElement = cardElement.querySelector('.card__button-bin');

  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;

  buttonLikeElement.addEventListener('click', handleLikeClick);
  buttonBinElement.addEventListener('click', handleRemoveCardClick);
  cardImageElement.addEventListener('click', function() {
    handleViewImageClick(cardImageElement.src, cardTitleElement);
  });
  return cardElement
}

function handleRemoveCardClick(evt) {
  evt.target.closest('.card').remove();
}

function handleLikeClick(evt) {
  evt.target.classList.toggle('card__button-like_active');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function handleEditProfileClick() {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  openPopup(popupProfileEdit);
}

function handleCloseEditProfileClick() {
  closePopup(popupProfileEdit);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup(popupProfileEdit);
}

function handleCloseAddCardClick() {
  closePopup(popupAddCard);
}


function handleAddCardClick() {
  openPopup(popupAddCard);
}


function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: placeInput.value,
    link: imgLinkInput.value
  }
  renderCard(cardData);
  closePopup(popupAddCard);
}

function handleViewImageClick(imgLink, caption) {
  const imageElement = cardImageTemplate.querySelector('.popup__container_fullscreen').cloneNode(true);
  imageElement.querySelector('figcaption').textContent = caption.textContent;
  imageElement.querySelector('.figure__image').src = imgLink;
  const buttonCloseElement = imageElement.querySelector('.popup__button-close');
  buttonCloseElement.addEventListener('click', function(evt) {
    buttonCloseElement.parentElement.remove();
    closePopup(popupViewImage);
  })
  popupViewImage.appendChild(imageElement);
  openPopup(popupViewImage);
}

// Edit Profile Form: opening, closing, submitting
editProfileButton.addEventListener('click', handleEditProfileClick);
closeProfileButton.addEventListener('click', handleCloseEditProfileClick);
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

// Adding Card Form: opening, closing, submitting
addCardButton.addEventListener('click', handleAddCardClick);
closeAddCardButton.addEventListener('click', handleCloseAddCardClick);
addCardForm.addEventListener('submit', handleCardFormSubmit);

// Filling the page with existing data
addExistingCards(initialCards);