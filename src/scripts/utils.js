import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Api from './Api.js';

export const editAvatarModalWindow = document.querySelector('.popup_type_edit-avatar');
export const addCardModalWindow = document.querySelector('.popup_type_add-card');
export const editProfileModalWindow = document.querySelector('.popup_type_edit-profile');
export const deleteCardModalWindow = document.querySelector('.popup_type_delete-card');
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

// export const popupImageInstance = new PopupWithImage(imageModalWindow);
// export const editProfilePopup = new PopupWithForm(
//   {popupSelector: editProfileModalWindow, 
//   submitPopup: () => userInfo.setUserInfo(nameInput.value, jobInput.value)
//   });
// export const addCardPopup = new PopupWithForm(
//   {popupSelector: addCardModalWindow, 
//     submitPopup: (data) => 
    
//   });
// export const editAvatarPopup = new PopupWithForm(editAvatarModalWindow, handleEditProfileFormSubmit, handleAddCardFormSubmit);
// export const deleteCardPopup = new PopupWithForm(deleteCardModalWindow, handleEditProfileFormSubmit, handleAddCardFormSubmit);
// export const userInfo = new UserInfo(profileTitle, profileDescription);

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

// export function handleCardClick(name, link) {
//     popupImageInstance.open(name, link);
//   }

// export function openAvatarEdit() {
//   editAvatarPopup.open();
// }

// export function openProfileEdit() {
// editProfilePopup.open();
// }

// export function openAddCard() {
//   addCardPopup.open();
// }

// export function openDeleteCard() {
//   deleteCardPopup.open();
// }

// export function handleEditProfileFormSubmit(event, inputValues) {
//   event.preventDefault();
//   userInfo.setUserInfo(inputValues[0], inputValues[1]);
//   editProfilePopup.close();
// }

// export function handleAddCardFormSubmit(event, inputValues) {
// event.preventDefault();

//const data = { name: inputValues[0], link: inputValues[1] }
//const newCard = new Card({ data, handleCardClick }, ".card-template");
//const newCardElement = newCard.getCardElement();
//list.prepend(newCardElement);

cardTitle.value = "";
cardLink.value = "";
//addCardPopup.close();