import Card from './Card.js';

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

export function handleCardClick(data) {
  /*
    popupImage.src = data.link;
    popupImage.setAttribute("alt", data.name);
    popupImageTitle.textContent = data.name;
  */
    toggleModalWindow(imageModalWindow);
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

export function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  toggleModalWindow(editProfileModalWindow);
}

export function handleAddCardFormSubmit(event) {
event.preventDefault();

const data = { name: cardTitle.value, link: cardLink.value }
const newCard = new Card({ data, handleCardClick }, ".card-template");
const newCardElement = newCard.getCardElement();
list.prepend(newCardElement);

cardTitle.value = "";
cardLink.value = "";
toggleModalWindow(addCardModalWindow);
}