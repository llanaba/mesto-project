const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27',
  headers: {
    authorization: 'f064128c-9ee2-488b-af8c-42d65f638aa9',
    'Content-Type': 'application/json'
  }
}

export const getUser = (id) => {
  const url = `${config.baseUrl}/users/${id}`;
  return fetch(url, {
    headers: config.headers
  })
    .then((res) => {
      return res.json();
    })
}

export const getInitialCards = () => {
  const url = `${config.baseUrl}/cards`;
  return fetch(url, {
    headers: config.headers
  })
    .then((res) => {
      return res.json();
    })
}

export const updateProfileInfo = (userName, userDescription) => {
  const url = `${config.baseUrl}/users/me`;
  fetch(url, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userDescription
    })
  })
}

export const postNewCard = (cardName, imageLink) => {
  console.log("I'm adding a new card")
  const url = `${config.baseUrl}/cards`;
  return fetch(url, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: imageLink
    })
  })
  .then((res) => {
    if (res.ok) {
      console.log(res)
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const deleteCard = (cardId) => {
  console.log("I'm deleting cards")
  const url = `${config.baseUrl}/cards/${cardId}`
  return fetch(url, {
    method: 'DELETE',
    headers: config.headers,
  })
}

export const likeCard = (cardId, method) => {
  console.log("I'm liking cards")
  const url = `${config.baseUrl}/cards/likes/${cardId}`
  return fetch(url, {
    method: method,
    headers: config.headers,
  })
  .then((res) => {
      return res.json();
  })
}

export const updateAvatar = (avatarUrl) => {
  console.log("I'm about to update avatar")
  const url = `${config.baseUrl}/users/me/avatar`
  return fetch(url, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then((res) => {
    return res.json();
  })
}

// fetch('https://nomoreparties.co/v1/cohortId/users/me', {
//   method: 'PATCH',
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Marie Skłodowska Curie',
//     about: 'Physicist and Chemist'
//   })
// });

// Запрос к серверу, на котором карточки

// fetch('https://nomoreparties.co/v1/plus-cohort-27/cards', {
//   headers: {
//     authorization: 'f064128c-9ee2-488b-af8c-42d65f638aa9'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// Запрос на информацию о пользователе
// fetch('https://nomoreparties.co/v1/plus-cohort-27/users/me', {
//   headers: {
//     authorization: 'f064128c-9ee2-488b-af8c-42d65f638aa9'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });