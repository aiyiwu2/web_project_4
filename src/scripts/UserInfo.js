import { profileTitle, profileDescription, titleInputValue, descriptionInputValue } from './utils.js';

class UserInfo {
    constructor(name, job) {
        this._name = name;
        this._job = job;
    }

    getUserInfo() {
        this.userInfo = {
            name: this._name.textContent,
            job: this._job.textContent
        }

        return this.userInfo;
    }

    setUserInfo(nameInput, jobInput) {
        this._name.textContent = nameInput;
        this._job.textContent = jobInput;
    }
}

export default UserInfo;