class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
      }
  
    // GET https://around.nomoreparties.co/v1/groupId/cards
    getCardList() {
      return fetch(this._baseUrl + '/cards', {
        headers: this._headers
      })
      .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    }

    // GET https://around.nomoreparties.co/v1/groupId/users/me
    getUserInfo() {
      return fetch(this._baseUrl + '/users/me', {
        headers: this._headers
      })
      .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    }

    // POST https://around.nomoreparties.co/v1/groupId/cards
    addCard({ name, link }) {
      return fetch(this._baseUrl + '/cards', {
        headers: this._headers,
        method: "POST",
        body: JSON.stringify({
          name,
          link
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    }

    // DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
    removeCard(cardID) {
      return fetch(this._baseUrl + '/cards/' + cardID, {
        headers: this._headers,
        method: "DELETE"
      })
      .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    }

    // PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    // DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    addCardLike(cardID) {
      return fetch(this._baseUrl + '/cards/likes/' + cardID, {
        headers: this._headers,
        method: "PUT"
      })
      .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    }

    deleteCardLike(cardID) {
      return fetch(this._baseUrl + '/cards/likes/' + cardID, {
        headers: this._headers,
        method: "DELETE"
      })
      .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    }

    // PATCH https://around.nomoreparties.co/v1/groupId/users/me
    setUserInfo({ name, about }) {
      return fetch(this._baseUrl + "/users/me", {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        }),
      })
      .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    }

    // PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
    setUserAvatar({ avatar }) {
      return fetch(this._baseUrl + "/users/me/avatar", {
        headers: this._headers,
        method: "PATCH",
        body: JSON.stringify({
          avatar
        }),
      })
      .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    }
  }

  export default Api;