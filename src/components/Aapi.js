export default class Aapi {
  constructor (options) {
    console.log("I'm inside class Api constructor")
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
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

  updateProfileInfo (userName, userDescription) {
    const url = `${config.baseUrl}/users/me`;
    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userDescription
      })
    })
      .then((res) => {
        return getResponseData(res);
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
        return getResponseData(res);
      })
  }
}
