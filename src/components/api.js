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
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
}

export const getInitialCards = () => {
  const url = `${config.baseUrl}/cards`;
  return fetch(url, {
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
}

export const updateProfileInfo = (userName, userDescription) => {
  const url = `${config.baseUrl}/users/me`;
  return fetch(url, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userDescription
    })
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

export const postNewCard = (cardName, imageLink) => {
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
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const deleteCard = (cardId) => {
  const url = `${config.baseUrl}/cards/${cardId}`
  return fetch(url, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

export const likeCard = (cardId, method) => {
  const url = `${config.baseUrl}/cards/likes/${cardId}`
  return fetch(url, {
    method: method,
    headers: config.headers,
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const updateAvatar = (avatarUrl) => {
  const url = `${config.baseUrl}/users/me/avatar`
  return fetch(url, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const renderLoading = (isLoading, saveButton, origText) => {
  if (isLoading) {
    saveButton.innerText = "Сохранение...";
  } else {
    saveButton.innerText = origText;
  }
}