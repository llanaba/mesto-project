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
}

// export const getUser = (id) => {
//   const url = `${config.baseUrl}/users/${id}`;
//   return fetch(url, {
//     headers: config.headers
//   })
//     .then((res) => {
//       return getResponseData(res);
//     });
// }
// export const getInitialCards = () => {
//   const url = `${config.baseUrl}/cards`;
//   return fetch(url, {
//     headers: config.headers
//   })
//     .then((res) => {
//       return getResponseData(res);
//     });
// }