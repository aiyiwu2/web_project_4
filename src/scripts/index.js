import Card from '../scripts/Card.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import { FormValidator, defaultConfig } from '../scripts/FormValidation.js';
import { addCardModalWindow, editProfileModalWindow, toggleModalWindow, imageModalWindow, profileTitle, profileDescription, titleInputValue, descriptionInputValue, formEdit, list, popupImageInstantiation, handleModalEsc, handleCardClick, handleEditProfileFormSubmit, handleAddCardFormSubmit, editProfilePopup, addCardPopup, openProfileEdit, openAddCard } from "../scripts/utils.js";

//const addCardModalWindow = document.querySelector('.popup_type_add-card');
//const editProfileModalWindow = document.querySelector('.popup_type_edit-profile');

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
//const formEdit = document.querySelector('.popup__form');
const addCardSubmitButton = addCardModalWindow.querySelector('.popup__button');

//profile
//const profileTitle = document.querySelector('.profile__title');
//const profileDescription = document.querySelector('.profile__subtitle');
//const popupImageTitle = imageModalWindow.querySelector('.popup__image-title');

//form inputs
//const titleInputValue = formEdit.querySelector('.popup__input_type_name');
//const descriptionInputValue = formEdit.querySelector('.popup__input_type_bio');
//const cardLink = document.querySelector('.popup__input_type_url');
//const cardTitle = document.querySelector('.popup__input_type_card-title');

export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');


editProfilePopup.setEventListeners();
profileEditOpenButton.addEventListener('click', () => {
openProfileEdit();
})

addCardPopup.setEventListeners();
addCardOpenButton.addEventListener('click', () => {
  openAddCard();
})

popupImageInstantiation.setEventListeners();

window.addEventListener('keydown', handleModalEsc);

//formEdit.addEventListener('submit', handleEditProfileFormSubmit);
/*
profileEditButton.addEventListener('click', () => {
    if (!editProfileModalWindow.classList.contains('popup_opened')) {
        titleInputValue.value = profileTitle.textContent;
        descriptionInputValue.value = profileDescription.textContent;
    }
    toggleModalWindow(editProfileModalWindow);
});
*/
modalCloseButton.addEventListener('click', () => {
    toggleModalWindow(editProfileModalWindow);
});
/*
addCardModalButton.addEventListener('click', () => {
    toggleModalWindow(addCardModalWindow);
});
*/
addCardModalCloseButton.addEventListener('click', () => {
    toggleModalWindow(addCardModalWindow);
});

imagePopupCloseButton.addEventListener('click', () => {
  toggleModalWindow(imageModalWindow);
});

initialCards.forEach(data => {
  const newCard = new Card({ data, handleCardClick }, ".card-template");
  const newCardElement = newCard.getCardElement();
  list.append(newCardElement);
});
/*
addCardSubmitButton.addEventListener("click", (event) => {
  handleAddCardFormSubmit(event);
});
*/
editFormValidator.enableValidation();
addFormValidator.enableValidation();
