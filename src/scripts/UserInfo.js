class UserInfo {
    constructor(name, about) {
        this._name = name;
        this._about = about;
    }

    getUserInfo() {
        this.userInfo = {
            name: this._name.textContent,
            about: this._about.textContent
        }

        return this.userInfo;
    }

    setUserInfo(nameInput, aboutInput) {
        this._name.textContent = nameInput;
        this._about.textContent = aboutInput;
    }
}

export default UserInfo;