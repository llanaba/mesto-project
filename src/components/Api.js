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
    return res.json();
  }

  // universal server requests
  _request(endpoint, options) {
    const url = this._baseUrl + endpoint;
    return fetch(url, options).then(this._getResponseData);
  }

  // METHODS TO DEAL WITH CARDS
  // Getting photo cards from the server
  getInitialCards () {
    return this._request('cards', { method: 'GET', headers: this._headers });
  }

  // Liking and unliking actions being sent to the server
  likeCard (cardId, method) {
    const endpoint = `cards/likes/${cardId}`
    return this._request(endpoint, { method: method, headers: this._headers });
  }

  // deleting a photo card
  deleteCard (cardId) {
    const endpoint = `cards/${cardId}`;
    return this._request(endpoint, { method: 'DELETE', headers: this._headers });
  }

  // sending a new photo card
  postNewCard ({ 'place-name': cardName, 'place-link': imageLink }) {
    return this._request('cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: imageLink
      })
    });
  }

  // METHODS TO DEAL WITH USER
  // fetching user data from the server
  getUser () {
    return this._request('users/me', {
      method: 'GET',
      headers: this._headers
    });
  }

  // updating user information
  updateProfileInfo (userName, userDescription) {
    return this._request('users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userDescription
      })
    });
  }

  // posting updated user avatar to the server
  updateAvatar (avatarUrl) {
    return this._request('users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    });
  }
}
