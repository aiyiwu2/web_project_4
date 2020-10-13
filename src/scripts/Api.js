class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
      }
  
    // GET https://around.nomoreparties.co/v1/groupId/cards
    getCardList() {

    }

    // GET https://around.nomoreparties.co/v1/groupId/users/me
    getUserInfo() {

    }

    getAppInfo() {

    }

    // POST https://around.nomoreparties.co/v1/groupId/cards
    addCard({ name, link }) {

    }

    // DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
    removeCard(cardID) {

    }

    // PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    // DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    changeCardLikeStatus(cardID, like) {

    }

    // PATCH https://around.nomoreparties.co/v1/groupId/users/me
    setUserInfo({ name, about }) {

    }

    // PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
    setUserAvatar({ avatar }) {

    }
  }

  export default Api;
  
  const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-42",
    headers: {
      authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
      "Content-Type": "application/json"
    }
  });