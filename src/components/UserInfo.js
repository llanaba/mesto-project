class UserInfo {
  constructor ({ name = '', about = '', avatar = '', _id = '', cohort = '' }, { setInfoServer, getInfoServer }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;
    this._cohort = cohort;

    this._setInfoServer = setInfoServer;
    this._getInfoServer = getInfoServer;
  }

  // getting user information from the server and returning this information
  getUserInfo () {
    const userInfo = this._getInfoServer();
    if (userInfo.ok) {
      const { name, about, avatar, _id, cohort } = userInfo;
      this._name = name;
      this._about = about;
      this._avatar = avatar;
      this._id = _id;
      this._cohort = cohort;
      return this;
    } else {
      return false;
    }
  }

  // sending user information to the server
  setUserInfo () {
    this._setInfoServer(this);
  }
}