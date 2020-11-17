import "../pages/index.css"; // add import of the main stylesheets file
import Card from './Card.js';
import Section from './Section.js';
import { FormValidator, defaultConfig } from './FormValidation.js';
import { initialCards, editAvatarModalWindow, addCardModalWindow, editProfileModalWindow, deleteCardModalWindow, list, imageModalWindow, profileTitle, profileDescription, openAddCard, handleAddCardFormSubmit, formEdit, titleInputValue, descriptionInputValue } from "./utils.js";
import Api from './Api.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

export const userInfo = new UserInfo(profileTitle, profileDescription);

// fetch("https://around.nomoreparties.co/v1/group-5/users/ed300335-e1bd-4128-98db-8b10403a3044")
// .then(res => res.json())
// .then(response => {
//    console.log(response)
//  })

// fetch("https://around.nomoreparties.co/v1/group-5/cards/")
// .then(res => res.json())
// .then(response => {
//   console.log(response)
// })


const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-5",
    headers: {
      authorization: "ed300335-e1bd-4128-98db-8b10403a3044",
      "Content-Type": "application/json"
    }
  });

//displays all users' cards
api.getCardList()
.then(res => {
  const displayCards = new Section(
    { 
      items: res, 
      renderer: (data) => {
        const card = new Card({ 
          data, 
          handleCardClick: () => {
            imageModalWindow.open();
          },
          handleDeleteClick: (card) => {
            deleteCardModalWindow.open(card);
          }
        }, ".card-template")
        const generatedCard = card.getCardElement();
        displayCards.addItem(generatedCard); 
      }
     }, 
      list);
      displayCards.renderer();
}
)

//loads user information from the server
api.getUserInfo()
.then(res => {
  userInfo.setUserInfo(res.name, res.about)
})

//displays my cards
const displayCards = new Section(
  { 
    items: initialCards, 
    renderer: (data) => {
      const card = new Card({ 
        data, 
        handleCardClick: () => {
          imageModalWindow.open(data);
        },
        handleDeleteClick: (card) => {
          deleteCardModalWindow.open(card);
        }
      }, ".card-template")
      const generatedCard = card.getCardElement();
      displayCards.addItem(generatedCard); 
    }
   }, 
    list);
    
displayCards.renderer();

// const deleteCardPopup = new PopupWithForm({
//   popupSelector: ".popup_type_delete-card"
// });
// deleteCardPopup.setEventListeners();

const addCardForm = addCardModalWindow.querySelector('.popup__form');
const editProfileForm = editProfileModalWindow.querySelector('.popup__form');
const editAvatarForm = editAvatarModalWindow.querySelector('.popup__form');

const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const addFormValidator = new FormValidator(defaultConfig, addCardForm);
const editAvatarFormValidator = new FormValidator(defaultConfig, editAvatarForm);

const cardTemplate = document.querySelector('.card-template').content.querySelector('.card'); 

//openButtons
const profileEditOpenButton = document.querySelector('.profile__edit');
const addCardOpenButton = document.querySelector('.profile__add-button');
const avatarOpenButton = document.querySelector('.profile__avatar');
const deleteCardOpenButton = cardTemplate.querySelector('.card__delete');

const profileAvatarEdit = document.querySelector('.profile__avatar-edit');

//Buttons and other DOM elements
const addCardSubmitButton = addCardModalWindow.querySelector('.popup__button');
const editProfileSubmitButton = editProfileModalWindow.querySelector('.popup__button');

const titleInput = document.querySelector(".popup__input_type_name")
const descriptionInput = document.querySelector('.popup__input_type_bio');

export const popupImageInstance = new PopupWithImage(imageModalWindow);
export const editProfilePopup = new PopupWithForm(
  {popupSelector: editProfileModalWindow, 
  submitPopup: () => userInfo.setUserInfo(titleInput.value, descriptionInput.value)
  });
export const addCardPopup = new PopupWithForm(
  {popupSelector: addCardModalWindow, 
    submitPopup: (data) => {
      api.addCard(data);
      const card = new Card({
        data,
        handleCardClick: () => {
          imageModalWindow.open(data);
        },
        handleDeleteClick: (card) => {
          deleteCardPopup.open(card);
        }
      }, ".card-template");
      const generatedCard = card.getCardElement();
        displayCards.addItem(generatedCard); 
    }
    
  });
// export const editAvatarPopup = new PopupWithForm({
//   popupSelector: editAvatarModalWindow,
//   submitPopup:  
// });
// export const deleteCardPopup = new PopupWithForm({
//   popupSelector: deleteCardModalWindow, 
//   submitPopup: 
// });
//console.log(UserInfo)

//console.log(userInfo)

function showAvatarEdit() {
  profileAvatarEdit.classList.toggle('profile__avatar-edit_visible');
}

// export function openAvatarEdit() {
//   editAvatarPopup.open();
// }

export function openProfileEdit() {
editProfilePopup.open();
}

avatarOpenButton.addEventListener('mouseenter', showAvatarEdit);
avatarOpenButton.addEventListener('mouseleave', showAvatarEdit);

// editAvatarPopup.setEventListeners();
avatarOpenButton.addEventListener('click', () => {
  openAvatarEdit();
})

editProfilePopup.setEventListeners();
profileEditOpenButton.addEventListener('click', () => {
openProfileEdit();
})

addCardPopup.setEventListeners();
addCardOpenButton.addEventListener('click', () => {
  console.log(3)
  console.log(openAddCard)
  openAddCard();
})

//deleteCardPopup.setEventListeners();
deleteCardOpenButton.addEventListener('click', () => {
  openDeleteCard();
})


popupImageInstance.setEventListeners();

//editProfileSubmitButton.addEventListener('click', handleEditProfileFormSubmit);

//addCardSubmitButton.addEventListener('click', handleAddCardFormSubmit);



editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();