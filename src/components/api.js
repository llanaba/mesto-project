export class Api {
  constructor ({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
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

  // downloading user information from the server
  async getUserInfo () {
    const url = `${this._baseUrl}/users/me`;
    return await fetch(url, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  // downloading cards from the server
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

  // editing a profile
  getInitialCards ({ userName, userDescription }) {
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

  // adding a new card
  postNewCard ({ cardName, imageLink }) {
    const url = `${this._baseUrl}/cards`;
    return fetch(url, {
      method: 'PATCH',
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

  // deleting a card
  deleteCard ({ cardId }) {
    const url = `${this._baseUrl}/cards/${cardId}`;
    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  // setting and removing likes
  likeCard ({ cardId }, method) {
    const url = `${this._baseUrl}/cards/likes/${cardId}`
    return fetch(url, {
      method: method,
      headers: this.headers
    })
      .then((res) => {
        return getResponseData(res);
      })
  }

  // updating the user's avatar
  updateAvatar ({ avatarUrl }) {
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


// !!! Вывести в index.js !!!
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
}); 