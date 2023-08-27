import { cardSelectors } from "../utils/constants";

export default class Card {
  constructor (
    { _id, name, link, owner, likes },
    cardTemplateSelector,
    { deleteCard, likeCardApi, openViewImagePopup }
  ) {
    this._cardId = _id; // photo card id
    this._name = name; // photo card name
    this._link = link; // link to the image of the photo card
    this._owner = owner; // information about the author of the photo card
    this._likes = likes; // list of people who liked the card

    this._selector = cardTemplateSelector // photo card template selector

    this._deleteCard = deleteCard; // photo card removal function
    this._likeCard = likeCardApi; // like function photo cards
    this._viewImage = openViewImagePopup; // the function of opening a pop-up with the image of a photo card

    this._userAuthor = false; // is the author of the photo card a user
    this._userLike = false; // did the user like the photos
  }

  // return of the finished marking of the photo card
  _getElement () {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  // deleting a photo card
  _handleDeleteClick () {
    this._deleteCard(this);
  }

  // the layout of the like of the photo card
  _handleLikeClick () {
    const method = this._userLike ? 'DELETE': 'PUT';
    this._likeCard(this._cardId, method)
      .then(({ likes }) => {
        this._userLike = !this._userLike;
        this._likes = likes;
        this._element.likeCounter.textContent = this._likes.length;
        this._element.buttons.buttonLikeElement.classList.toggle('card__button-like_active');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // the layout of the like of the photo card
  _setEventListeners () {
    this._element.buttons.buttonLikeElement.addEventListener('click', (evt) => {
      this._handleLikeClick();
    });
    this._element.buttons.buttonBinElement.addEventListener('click', (evt) => {
      this._handleDeleteClick();
    });
    this._element.cardImage.addEventListener('click', (evt) => {
      this._viewImage(this._name, this._link);
    });
  }

  _userLikesCard (userId) {
    if (this._likes) {
      const userLikes = this._likes.some(function(fan) {
        return fan._id === userId
      });
      return userLikes
    }
    return false
  }
  // returns a fully finished card element
  generate({ userId }) {
    if (this._owner._id === userId) this._userAuthor = true;
    if (this._likes.some((like) => like._id === userId)) this._userLike = true;
    this._element = this._getElement();

    // we draw something that does not depend on the user
    this._element.cardName = this._element.querySelector(cardSelectors.cardName);
    this._element.cardImage = this._element.querySelector(cardSelectors.cardImage);
    this._element.likeCounter = this._element.querySelector(cardSelectors.likeCounter);

    this._element.cardName.textContent = this._name;
    this._element.cardImage.src = this._link;
    this._element.cardImage.alt = this._name;
    this._element.likeCounter.textContent = this._likes.length;

    // looking for buttons for the card
    this._element.buttons = {};
    this._element.buttons.buttonLikeElement = this._element.querySelector(cardSelectors.buttonLike);
    this._element.buttons.buttonBinElement = this._element.querySelector(cardSelectors.buttonBin);

    // we draw a heart depending on whether it is liked by the user
    if (this._userLike) {
      this._element.buttons.buttonLikeElement.classList.add('card__button-like_active')
    }
    // we draw the basket depending on whether the user is the author
    if (this._userAuthor) {
      this._element.buttons.buttonBinElement.style.display = 'block';
    }

    // hang up the listeners
    this._setEventListeners();
    return this._element;
  }
}
