import FormValidator from './FormValidation.js';
import Card from './Card.js';

const defaultConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

const addCardModalWindow = document.querySelector('.popup_type_add-card');
const editProfileModalWindow = document.querySelector('.popup_type_edit-profile');

const addCardForm = addCardModalWindow.querySelector('.popup__form');
const editProfileForm = editProfileModalWindow.querySelector('.popup__form');

const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const addFormValidator = new FormValidator(defaultConfig, addCardForm);

//editFormValidator.enableValidation();
//addFormValidator.enableValidation();

//wrappers
//const addCardModalWindow = document.querySelector('.popup_type_add-card');
//const editProfileModalWindow = document.querySelector('.popup_type_edit-profile');
const imageModalWindow = document.querySelector('.popup_type_image');

//openButtons
const profileEditButton = document.querySelector('.profile__edit');
const addCardModalButton = document.querySelector('.profile__add-button');

//closeButtons
const addCardModalCloseButton = addCardModalWindow.querySelector('.popup__close');
const modalCloseButton = editProfileModalWindow.querySelector('.popup__close');
const imagePopupCloseButton = imageModalWindow.querySelector('.popup__close');

//Buttons and other DOM elements
const formEdit = document.querySelector('.popup__form');
const addCardSubmitButton = addCardModalWindow.querySelector('.popup__button');

//profile
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const popupImageTitle = imageModalWindow.querySelector('.popup__image-title');

//form inputs
const titleInputValue = formEdit.querySelector('.popup__input_type_name');
const descriptionInputValue = formEdit.querySelector('.popup__input_type_bio');
const cardLink = document.querySelector('.popup__input_type_url');
const cardTitle = document.querySelector('.popup__input_type_card-title');

//image
const popupImage = imageModalWindow.querySelector('.popup__image');

let activeModal = null;

function toggleModalWindow(modal) {
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

const handleModalClick = ({ target }) => {
    if (target.classList.contains("popup") || target.classList.contains("popup__close")) {
      toggleModalWindow(activeModal);
    }
};

function handleModalEsc(event) {
  if (event.key == "Escape") {
    toggleModalWindow(activeModal);
}
}

window.addEventListener('keydown', handleModalEsc);

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = titleInputValue.value;
    profileDescription.textContent = descriptionInputValue.value;
    toggleModalWindow(editProfileModalWindow);
}


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

initialCards.forEach(data => {
  const newCard = new Card(data, ".card-template");
  newCard.getCardElement();
  list.prepend(newCard(data.name, data.link));
  //newCard(data.name, data.link);
  //list.prepend(newCard(data.name, data.link));
});
/*
function newCard(title, image) {
  //const cardElement = cardTemplate.cloneNode(true);
  const cardElement = new Card(initialCards, ".card-template");

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__heart');
  const cardDeleteButton = cardElement.querySelector('.card__delete');

  cardTitle.textContent = title;
  cardImage.setAttribute("alt", title);
  cardImage.style.backgroundImage = `url(${image})`;

  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('card__heart_mode_like');
  });

  cardDeleteButton.addEventListener('click', () => {
    const cardRemove = cardDeleteButton.closest('.card');
    cardRemove.remove();
  });

  cardImage.addEventListener('click', () => {
    popupImage.src = image;
    popupImage.setAttribute("alt", title);
    popupImageTitle.textContent = title;

    toggleModalWindow(imageModalWindow);
  });

  return cardElement;  
};
*/

export default function handleCardClick(data) {
  popupImage.src = data.link;
  popupImage.setAttribute("alt", data.name);
  popupImageTitle.textContent = data.name;

  toggleModalWindow(imageModalWindow);
}

addCardSubmitButton.addEventListener("click", event => {
  event.preventDefault();
  
  list.prepend(newCard(cardTitle.value, cardLink.value));
  cardTitle.value = "";
  cardLink.value = "";
  toggleModalWindow(addCardModalWindow);
});

