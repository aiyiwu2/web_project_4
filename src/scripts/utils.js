import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import { initialCards } from './index.js';

export const addCardModalWindow = document.querySelector('.popup_type_add-card');
export const editProfileModalWindow = document.querySelector('.popup_type_edit-profile');
export const imageModalWindow = document.querySelector('.popup_type_image');

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__subtitle');

export const popupImage = imageModalWindow.querySelector('.popup__image');
export const popupImageTitle = imageModalWindow.querySelector('.popup__image-title');

export let activeModal = null;
export const formEdit = document.querySelector('.popup__form');

export const titleInputValue = formEdit.querySelector('.popup__input_type_name');
export const descriptionInputValue = formEdit.querySelector('.popup__input_type_bio');
export const cardLink = document.querySelector('.popup__input_type_url');
export const cardTitle = document.querySelector('.popup__input_type_card-title');

export const list = document.querySelector('.cards');

export const popupImageInstantiation = new PopupWithImage(imageModalWindow);
export const editProfilePopup = new PopupWithForm(editProfileModalWindow, handleEditProfileFormSubmit, handleAddCardFormSubmit);
export const addCardPopup = new PopupWithForm(addCardModalWindow, handleEditProfileFormSubmit, handleAddCardFormSubmit);
export const userInfo = new UserInfo(profileTitle, profileDescription);


//addCardPopup.


export function handleCardClick(name, link) {
  
    popupImageInstantiation.open(name, link);
    
  }

export function openProfileEdit() {
editProfilePopup.open();
}

export function openAddCard() {
  addCardPopup.open();
}

export function toggleModalWindow(modal) {
const isModalOpened = modal.classList.contains("popup_opened");

activeModal = modal;
modal.classList.toggle("popup_opened");

if (isModalOpened) {
    document.removeEventListener("keydown", handleModalEsc);
    modal.removeEventListener("click", handleModalClick);
    activeModal = null;
} else {
    document.addEventListener("keydown", handleModalEsc);
    modal.addEventListener("click", handleModalClick);
}
}

 export const handleModalClick = ({ target }) => {
    if (target.classList.contains("popup") || target.classList.contains("popup__close")) {
      toggleModalWindow(activeModal);
    }
};

export function handleModalEsc(event) {
  if (event.key == "Escape") {
    toggleModalWindow(activeModal);
}
};

export function handleEditProfileFormSubmit(event, inputValues) {
  event.preventDefault();
  userInfo.setUserInfo(inputValues[0], inputValues[1]);
  editProfilePopup.close();
}

export function handleAddCardFormSubmit(event, inputValues) {
event.preventDefault();

const data = { name: inputValues[0], link: inputValues[1] }
const newCard = new Card({ data, handleCardClick }, ".card-template");
const newCardElement = newCard.getCardElement();
list.prepend(newCardElement);

cardTitle.value = "";
cardLink.value = "";
addCardPopup.close();
}