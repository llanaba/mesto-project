export default class UserInfo {
  constructor (
    { nameSelector, infoSelector, avatarSelector },
    { getInfoApi, setInfoProfileApi, setInfoAvatarApi }
  ) {
    this._userName = document.querySelector(nameSelector); // user name element
    this._userAbout = document.querySelector(infoSelector); // user description element
    this._userAvatar = document.querySelector(avatarSelector); // the user's avatar element

    this._getInfoApi = getInfoApi; // the function of obtaining user information
    this._setInfoProfileApi = setInfoProfileApi; // the function of sending user information
    this._setInfoAvatarApi = setInfoAvatarApi; // the function of sending the user's avatar
  }

  // fetches user's info from server, processes, renders and returns it
  getUserInfo () {
    const info = this._getInfoApi();
    info.then((userInfo) => {
      this._processUserInfo(userInfo);
      this._renderUserInfo();
    })
    .catch((err) => {
      console.log(err);
    });
    return info;
  }

  // unpacks user's info received from server and sets user's attributes
  _processUserInfo ({ name, about, avatar, _id }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;
  }

  // renders user's info on page
  _renderUserInfo () {
    this._userName.textContent = this._name;
    this._userAbout.textContent = this._about;
    this._userAvatar.src = this._avatar;
  }

  // processes data received from user and posts it to server
  setUserInfo ({ 'user-name': name, 'user-description': about, 'avatar-link': avatar }) {
    if ((name && this._name !== name) || (about && this._about !== about)) {
      return this._setInfoProfileApi(name, about)
        .then((userInfo) => {
          this._processUserInfo(userInfo);
          this._renderUserInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (avatar && this._avatar !== avatar) {
      return this._setInfoAvatarApi(avatar)
        .then((userInfo) => {
          this._processUserInfo(userInfo);
          this._renderUserInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
