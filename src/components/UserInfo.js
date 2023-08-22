// VERSION 2

export default class UserInfo {
  constructor ({nameSelector, infoSelector, avatarSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(infoSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  // getting user information from the server and returning this information
  getUserInfo (apiMethod) {
    console.log("I'm inside getUserInfo")
    this.userInfo = apiMethod()
    return this.userInfo
  }

  // so far - just renders the info on the page, doesn't send anything to the server
  setUserInfo ({ name, about, avatar }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
  }
}

// VERSION 1

// class UserInfo {
//   constructor ({ name = '', about = '', avatar = '', _id = '', cohort = '' }, { setInfoServer, getInfoServer }) {
//     this._name = name;
//     this._about = about;
//     this._avatar = avatar;
//     this._id = _id;
//     this._cohort = cohort;

//     this._setInfoServer = setInfoServer;
//     this._getInfoServer = getInfoServer;
//   }

//   // getting user information from the server and returning this information
//   getUserInfo () {
//     const userInfo = this._getInfoServer();
//     if (userInfo.ok) {
//       const { name, about, avatar, _id, cohort } = userInfo;
//       this._name = name;
//       this._about = about;
//       this._avatar = avatar;
//       this._id = _id;
//       this._cohort = cohort;
//       return this;
//     } else {
//       return false;
//     }
//   }

//   // sending user information to the server
//   setUserInfo () {
//     this._setInfoServer(this);
//   }
// }