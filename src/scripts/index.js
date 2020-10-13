import "../pages/index.css"; // add import of the main stylesheets file
import Card from './Card.js';
import Section from './Section.js';
import { FormValidator, defaultConfig } from './FormValidation.js';
import { initialCards, addCardModalWindow, editProfileModalWindow, list, popupImageInstance, handleCardClick, handleEditProfileFormSubmit, handleAddCardFormSubmit, editProfilePopup, addCardPopup, openProfileEdit, openAddCard } from "./utils.js";
import Api from './Api.js';

const addCardForm = addCardModalWindow.querySelector('.popup__form');
const editProfileForm = editProfileModalWindow.querySelector('.popup__form');

const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const addFormValidator = new FormValidator(defaultConfig, addCardForm);

//openButtons
const profileEditOpenButton = document.querySelector('.profile__edit');
const addCardOpenButton = document.querySelector('.profile__add-button');

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