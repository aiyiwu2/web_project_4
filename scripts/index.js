import Card from './Card.js';
import { FormValidator, defaultConfig } from './FormValidation.js';
import { toggleModalWindow, imageModalWindow, handleModalEsc } from "./utils.js";

const addCardModalWindow = document.querySelector('.popup_type_add-card');
const editProfileModalWindow = document.querySelector('.popup_type_edit-profile');

const addCardForm = addCardModalWindow.querySelector('.popup__form');
const editProfileForm = editProfileModalWindow.querySelector('.popup__form');

const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const addFormValidator = new FormValidator(defaultConfig, addCardForm);

//openButtons
const profileEditButton = document.querySelector('.profile__edit');
const addCardModalButton = document.querySelector('.profile__add-button');

//closeButtons
const addCardModalCloseButton = addCardModalWindow.querySelector('.popup__close');
const modalCloseButton = editProfileModalWindow.querySelector('.popup__close');
const imagePopupCloseButton = document.querySelector('.popup_type_image').querySelector('.popup__close');

//Buttons and other DOM elements
const formEdit = document.querySelector('.popup__form');
const addCardSubmitButton = addCardModalWindow.querySelector('.popup__button');

//profile
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
//const popupImageTitle = imageModalWindow.querySelector('.popup__image-title');

//form inputs
const titleInputValue = formEdit.querySelector('.popup__input_type_name');
const descriptionInputValue = formEdit.querySelector('.popup__input_type_bio');
const cardLink = document.querySelector('.popup__input_type_url');
const cardTitle = document.querySelector('.popup__input_type_card-title');

const initialCards = [
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
const list = document.querySelector('.cards');

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = titleInputValue.value;
    profileDescription.textContent = descriptionInputValue.value;
    toggleModalWindow(editProfileModalWindow);
}

function submitButtonClick(event) {
  event.preventDefault();
  
  const data = { name: cardTitle.value, link: cardLink.value }
  const newCard = new Card(data, ".card-template");
  const newCardElement = newCard.getCardElement();
  list.prepend(newCardElement);

  cardTitle.value = "";
  cardLink.value = "";
  toggleModalWindow(addCardModalWindow);
}

window.addEventListener('keydown', handleModalEsc);

formEdit.addEventListener('submit', handleEditProfileFormSubmit);

profileEditButton.addEventListener('click', () => {
    if (!editProfileModalWindow.classList.contains('popup_opened')) {
        titleInputValue.value = profileTitle.textContent;
        descriptionInputValue.value = profileDescription.textContent;
    }
    toggleModalWindow(editProfileModalWindow);
});

modalCloseButton.addEventListener('click', () => {
    toggleModalWindow(editProfileModalWindow);
});

addCardModalButton.addEventListener('click', () => {
    toggleModalWindow(addCardModalWindow);
});

addCardModalCloseButton.addEventListener('click', () => {
    toggleModalWindow(addCardModalWindow);
});

imagePopupCloseButton.addEventListener('click', () => {
  toggleModalWindow(imageModalWindow);
});

initialCards.forEach(data => {
  const newCard = new Card(data, ".card-template");
  const newCardElement = newCard.getCardElement();
  list.prepend(newCardElement);
});

addCardSubmitButton.addEventListener("click", (event) => {
  submitButtonClick(event);
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();
