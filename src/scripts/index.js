import "../pages/index.css"; // add import of the main stylesheets file
import Card from './Card.js';
import Section from './Section.js';
import { FormValidator, defaultConfig } from './FormValidation.js';
import { initialCards, editAvatarModalWindow, addCardModalWindow, editProfileModalWindow, deleteCardModalWindow, list, popupImageInstance, handleCardClick, handleEditProfileFormSubmit, handleAddCardFormSubmit, editAvatarPopup, editProfilePopup, addCardPopup, deleteCardPopup, openAvatarEdit, openProfileEdit, openAddCard, openDeleteCard, userInfo } from "./utils.js";
import Api from './Api.js';

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-5",
    headers: {
      authorization: "ed300335-e1bd-4128-98db-8b10403a3044",
      "Content-Type": "application/json"
    }
  });

api.getCardList()
.then(res => {
  const displayCards = new Section(
    { 
      items: res, 
      renderer: (data) => {
        const card = new Card({ data, handleCardClick }, ".card-template")
        const generatedCard = card.getCardElement();
        displayCards.addItem(generatedCard); 
      }
     }, 
      list);
      displayCards.renderer();
}
)

api.getUserInfo()
.then(res => {
  console.log('profile!!', res)

  userInfo.setUserInfo(res.name, res.about)
})

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

function showAvatarEdit() {
  profileAvatarEdit.classList.toggle('profile__avatar-edit_visible');
}

avatarOpenButton.addEventListener('mouseenter', showAvatarEdit);
avatarOpenButton.addEventListener('mouseleave', showAvatarEdit);

editAvatarPopup.setEventListeners();
avatarOpenButton.addEventListener('click', () => {
  openAvatarEdit();
})

editProfilePopup.setEventListeners();
profileEditOpenButton.addEventListener('click', () => {
openProfileEdit();
})

addCardPopup.setEventListeners();
addCardOpenButton.addEventListener('click', () => {
  openAddCard();
})

deleteCardPopup.setEventListeners();
deleteCardOpenButton.addEventListener('click', () => {
  openDeleteCard();
})


popupImageInstance.setEventListeners();

editProfileSubmitButton.addEventListener('click', handleEditProfileFormSubmit);

addCardSubmitButton.addEventListener('click', handleAddCardFormSubmit);

const displayCards = new Section(
  { 
    items: initialCards, 
    renderer: (data) => {
      const card = new Card({ data, handleCardClick }, ".card-template")
      const generatedCard = card.getCardElement();
      displayCards.addItem(generatedCard); 
    }
   }, 
    list);
    
displayCards.renderer();

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();