export default class UserInfo {
  constructor (
    { nameSelector, infoSelector, avatarSelector },
    { getInfoApi, setInfoProfileApi, setInfoAvatarApi }
  ) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(infoSelector);
    this._userAvatar = document.querySelector(avatarSelector);

    this._getInfoApi = getInfoApi;
    this._setInfoProfileApi = setInfoProfileApi;
    this._setInfoAvatarApi = setInfoAvatarApi;
  }

  // fetches user's info from server, processes, renders and returns it
  getUserInfo () {
    console.log("I'm inside getUserInfo")
    const info = this._getInfoApi();
    info.then((userInfo) => {
      this._processUserInfo(userInfo);
      this._renderUserInfo();
    })
    return info
  }

  // unpacks user's info received from server and sets user's attributes
  _processUserInfo ({ name, about, avatar, id }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = id;
  }

  // renders user's info on page
  _renderUserInfo () {
    this._userName.textContent = this._name;
    this._userAbout.textContent = this._about;
    this._userAvatar.src = this._avatar;
  }

  // processes data received from user and posts it to server
  setUserInfo ({ name, about, avatar }) {
    if (this._name !== name || this._about !== about) {
      this._setInfoProfileApi(this)
        .then((userInfo) => {
          this._processUserInfo(userInfo);
          this._renderUserInfo();
        });
    }
    if (this._avatar !== avatar) {
      this._setInfoAvatarApi(this)
        .then((userInfo) => {
          this._processUserInfo(userInfo);
          this._renderUserInfo();
        });
    }
  }
}
