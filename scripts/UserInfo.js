import { profileTitle, profileDescription, titleInputValue, descriptionInputValue } from './utils.js';

class UserInfo {
    constructor(name, job) {
        this._name = name;
        this._job = job;
    }

    getUserInfo() {
        let userInfo = {
            name: titleInputValue.value,
            job: descriptionInputValue.value
        };
/*
        let userInfo = {
            name: this._name,
            job: this._job
        }
*/
        return userInfo;
    }

    setUserInfo() {
        this.userInfo.name = profileTitle.textContent;
        this.userInfo.job = profileDescription.textContent;
    }
}

export default UserInfo;