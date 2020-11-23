class UserInfo {
    constructor(name, about) {
        this._name = name;
        this._about = about;
    }

    getUserInfo() {
        this.userInfo = {
            name: this._name.textContent,
            about: this._about.textContent,
            _id: this._id
        }

        return this.userInfo;
    }

    setUserInfo(nameInput, aboutInput, IDInput) {
        this._name.textContent = nameInput;
        this._about.textContent = aboutInput;
        this._id = IDInput;
    }
}

export default UserInfo;