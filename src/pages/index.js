import "./index.css";
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import { FormValidator, defaultConfig } from '../components/FormValidation.js';
import { editAvatarModalWindow, addCardModalWindow, editProfileModalWindow, deleteCardModalWindow, list, imageModalWindow, profileTitle, profileDescription, profilePicture, editAvatarForm, editProfileForm, addCardForm, profileEditOpenButton, addCardOpenButton, avatarOpenButton, deleteCardOpenButton, editProfileSubmitButton, editAvatarSubmitButton, addCardSubmitButton, deleteCardSubmitButton, titleInput, descriptionInput } from "../utils/utils.js";
import Api from '../components/Api.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const addFormValidator = new FormValidator(defaultConfig, addCardForm);
const editAvatarFormValidator = new FormValidator(defaultConfig, editAvatarForm);

export const userInfo = new UserInfo(profileTitle, profileDescription);

export const deleteCardPopup = new PopupWithForm({
  popupSelector: deleteCardModalWindow
});

export const popupImageInstance = new PopupWithImage(imageModalWindow);

export const editProfilePopup = new PopupWithForm({
  popupSelector: editProfileModalWindow, 
  submitPopup: (data) => {
    editProfileSubmitButton.textContent = "Saving...";
    api.setUserInfo({
      name: data.name,
      about: data.about
    })
    .then(res => {
      userInfo.setUserInfo(res.name, res.about)
      editProfileSubmitButton.textContent = "Save";
    })
    userInfo.setUserInfo(titleInput.value, descriptionInput.value)
  }
});

export const editAvatarPopup = new PopupWithForm({
  popupSelector: editAvatarModalWindow,
  submitPopup: handleAvatarEdit
});

function handleAvatarEdit(data) {
  editAvatarSubmitButton.textContent = "Saving...";
  api.setUserAvatar({
    avatar: data.avatar
  })
  .then(res => {
    profilePicture.src = res.avatar;
    editAvatarSubmitButton.textContent = "Save";
    editAvatarPopup.close();
  })
  .catch(err => console.log(err));
}

export function openAvatarEdit() {
editAvatarPopup.open();
}

export function openProfileEdit() {
titleInput.value = userInfo.getUserInfo().name;  
descriptionInput.value = userInfo.getUserInfo().about;
editProfilePopup.open();
}

function openDeleteCard() {
deleteCardPopup.open();
}

function handleCardClick(name, link) {
  popupImageInstance.open(name, link);
}

function handleDeleteClick(cardID, card) {
  deleteCardPopup.open(cardID, card);
      deleteCardPopup.submitData(() => {
        deleteCardSubmitButton.textContent = "Deleting...";
        api.removeCard(cardID, card)
        .then(() => {
          card.handleDeleteCard(cardID, card);
          deleteCardPopup.close();
          deleteCardSubmitButton.textContent = "Yes";
        })
        .catch(error => console.log(error))
      })
}

function handleLikeClick(cardID, card) {
  if (card.heart.classList.contains("card__heart_mode_like")) {
    card.heart.classList.remove("card__heart_mode_like");
    api.deleteCardLike(cardID, card)
    .then((res) => {
      card.displayLikeCount(res.likes.length)
    })
    .catch((error) => console.log(error))
  } else {
    card.heart.classList.add("card__heart_mode_like");
    api.addCardLike(cardID, card)
    .then((res) => {
      card.displayLikeCount(res.likes.length)
    })
    .catch((error) => console.log(error))
  }
}

const renderCard = data =>
  new Card({
    data,
    handleCardClick: (name, link) => {
      popupImageInstance.open(name, link);
    },
    handleDeleteClick: (cardID) => {
      deleteCardPopup.open(cardID);
      deleteCardPopup.submitData(() => {
        deleteCardSubmitButton.textContent = "Deleting...";
        api.removeCard(cardID)
        .then(() => {
          card.handleDeleteCard(cardID);
          deleteCardPopup.close();
          deleteCardSubmitButton.textContent = "Yes";
        })
        .catch(error => console.log(error))
      })
    },
    handleLikeClick: (cardID) => {
      if (card.heart.classList.contains("card__heart_mode_like")) {
        card.heart.classList.remove("card__heart_mode_like");
        api.deleteCardLike(cardID)
        .then((res) => {
          card.displayLikeCount(res.likes.length)
        })
        .catch((error) => console.log(error))
      } else {
        card.heart.classList.add("card__heart_mode_like");
        api.addCardLike(cardID)
        .then((res) => {
          card.displayLikeCount(res.likes.length)
        })
        .catch((error) => console.log(error))
      }
    }
  }, userInfo._id, ".card-template");

deleteCardPopup.setEventListeners();
popupImageInstance.setEventListeners();
editProfilePopup.setEventListeners();
editAvatarPopup.setEventListeners();

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-5",
  headers: {
    authorization: "ed300335-e1bd-4128-98db-8b10403a3044",
    "Content-Type": "application/json"
  }
});

//loads user information from the server
api.getUserInfo()
.then(res => {
  userInfo.setUserInfo(res.name, res.about, res._id, res.avatar)
  profilePicture.src = res.avatar;
})
.then(() => {
  //displays all users' cards
api.getCardList()
.then(res => {

  const displayCards = new Section(
    { 
      items: res, 
      renderer: (data) => {
        const card = new Card({ data, handleCardClick, handleDeleteClick, handleLikeClick }, userInfo._id, ".card-template");
        const generatedCard = card.getCardElement();
        card.displayLikeCount(card._data.likes.length)
        displayCards.addItem(generatedCard);
      },
     }, 
      list);
      displayCards.renderer();

      const addCardPopup = new PopupWithForm({
        popupSelector: addCardModalWindow, 
          submitPopup: (data) => {
            addCardSubmitButton.textContent = "Creating...";
            api.addCard({ name: data.name, link: data.link })
            .then((res) => {
              addCardSubmitButton.textContent = "Create";
              const card = new Card({ res, handleCardClick, handleDeleteClick, handleLikeClick }, userInfo._id, ".card-template");
              const generatedCard = card.getCardElement();
              card.displayLikeCount(card._data.likes.length)
              displayCards.prependItem(generatedCard); 
            }) 
          }
          
        });
        addCardPopup.setEventListeners();

        addCardOpenButton.addEventListener('click', () => {
          addCardPopup.open();
        })
    }
)
})

avatarOpenButton.addEventListener('click', () => {
  openAvatarEdit();
})

profileEditOpenButton.addEventListener('click', () => {
  openProfileEdit();
})

deleteCardOpenButton.addEventListener('click', () => {
  openDeleteCard();
})

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();