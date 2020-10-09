import "../pages/index.css"; // add import of the main stylesheets file
import Card from '../scripts/Card.js';
import Section from '../scripts/Section.js';
import { FormValidator, defaultConfig } from '../scripts/FormValidation.js';
import { initialCards, addCardModalWindow, editProfileModalWindow, imageModalWindow, list, popupImageInstance, handleCardClick, handleEditProfileFormSubmit, handleAddCardFormSubmit, editProfilePopup, addCardPopup, openProfileEdit, openAddCard } from "../scripts/utils.js";

const addCardForm = addCardModalWindow.querySelector('.popup__form');
const editProfileForm = editProfileModalWindow.querySelector('.popup__form');

const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const addFormValidator = new FormValidator(defaultConfig, addCardForm);

//openButtons
const profileEditOpenButton = document.querySelector('.profile__edit');
const addCardOpenButton = document.querySelector('.profile__add-button');

//closeButtons
const addCardModalCloseButton = addCardModalWindow.querySelector('.popup__close');
const modalCloseButton = editProfileModalWindow.querySelector('.popup__close');
const imagePopupCloseButton = document.querySelector('.popup_type_image').querySelector('.popup__close');

//Buttons and other DOM elements
const addCardSubmitButton = addCardModalWindow.querySelector('.popup__button');
const editProfileSubmitButton = editProfileModalWindow.querySelector('.popup__button');



editProfilePopup.setEventListeners();
profileEditOpenButton.addEventListener('click', () => {
openProfileEdit();
})

addCardPopup.setEventListeners();
addCardOpenButton.addEventListener('click', () => {
  openAddCard();
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