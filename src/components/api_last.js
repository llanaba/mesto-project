const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27',
  headers: {
    authorization: 'f064128c-9ee2-488b-af8c-42d65f638aa9',
    'Content-Type': 'application/json'
  }
}

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json()
}

export const getUser = (id) => {
  const url = `${config.baseUrl}/users/${id}`;
  return fetch(url, {
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res);
    });
}

export const getInitialCards = () => {
  const url = `${config.baseUrl}/cards`;
  return fetch(url, {
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res);
    });
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
      return getResponseData(res);
    });
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
    return getResponseData(res);
  });
}

export const deleteCard = (cardId) => {
  const url = `${config.baseUrl}/cards/${cardId}`
  return fetch(url, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => {
      return getResponseData(res);
    })
}

export const likeCard = (cardId, method) => {
  const url = `${config.baseUrl}/cards/likes/${cardId}`
  return fetch(url, {
    method: method,
    headers: config.headers,
  })
  .then((res) => {
    return getResponseData(res);
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
    return getResponseData(res);
  })
}

export const renderLoading = (isLoading, saveButton, origText) => {
  if (isLoading) {
    saveButton.innerText = "Сохранение...";
  } else {
    saveButton.innerText = origText;
  }
}