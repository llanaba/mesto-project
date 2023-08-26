export default class Api {
  constructor (options) {
    this._baseUrl = options.baseUrl; // link to the server
    this._headers = options.headers; // fundamental configurations for transmitting messages to the server
  }


  // checking the received result from the server for an error
  // success: decode the result into JSON format
  // error:   call reject
  _getResponseData (res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json()
  }

  // METHODS TO DEAL WITH CARDS
  // Getting photo cards from the server
  getInitialCards () {
    const url = `${this._baseUrl}/cards`;
    return fetch(url, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  // Liking and unliking actions being sent to the server
  likeCard (cardId, method) {
    const url = `${this._baseUrl}/cards/likes/${cardId}`
    return fetch(url, {
      method: method,
      headers: this._headers
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  // deleting a photo card
  deleteCard (cardId) {
    const url = `${this._baseUrl}/cards/${cardId}`;
    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  // sending a new photo card
  postNewCard ({ 'place-name': cardName, 'place-link': imageLink }) {
    const url = `${this._baseUrl}/cards`;
    return fetch(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: imageLink
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  // METHODS TO DEAL WITH USER
  // fetching user data from the server
  getUser () {
    const url = `${this._baseUrl}/users/me`;
    return fetch(url, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  // updating user information
  updateProfileInfo (userName, userDescription) {
    const url = `${this._baseUrl}/users/me`;
    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userDescription
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  // post updated user avatar to the server
  updateAvatar (avatarUrl) {
    const url = `${this._baseUrl}/users/me/avatar`
    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }
}
