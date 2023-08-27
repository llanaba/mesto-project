export default class UserInfo {
  constructor (
    { nameSelector, infoSelector, avatarSelector },
    userId
  ) {
    this._userNameElement = document.querySelector(nameSelector); // user name element
    console.log(this._userNameElement.textContent)
    this._userAboutElement = document.querySelector(infoSelector); // user description element
    this._userAvatarElement = document.querySelector(avatarSelector); // the user's avatar element
    this._userId = userId;
  }

  // fills the form with user's data
  getUserInfo () {
    return {
      name: this._userNameElement.textContent,
      about: this._userAboutElement.textContent,
      userId: this._userId,
    }
  }

  // renders user's data on the page
  setUserInfo({ name, about, avatar, _id }) {
    this._userNameElement.textContent = name;
    this._userAboutElement.textContent = about;
    this._userAvatarElement.src = avatar;
    this._userId = _id;
  }
}
