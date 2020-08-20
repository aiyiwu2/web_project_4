//wrappers
const addCardModalWindow = document.querySelector('.popup_type_add-card');
const editProfileModalWindow = document.querySelector('.popup_type_edit-profile');
const imageModalWindow = document.querySelector('.popup_type_image');

//openButtons
const profileEditButton = document.querySelector('.profile__edit');
const addCardModalButton = document.querySelector('.profile__add-button');

//closeButtons
const closeAddCardModalButton = addCardModalWindow.querySelector('.popup__close');
const modalCloseButton = editProfileModalWindow.querySelector('.popup__close');
const closeImagePopupButton = imageModalWindow.querySelector('.popup__close');

//Buttons and other DOM elements
const editForm = document.querySelector('.popup__form');
const cardDelete = document.querySelector('.card__delete');
const addCardSubmitButton = addCardModalWindow.querySelector('.popup__save');

//profile
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const popupImageTitle = imageModalWindow.getElementsByClassName('popup__image-title')[0];

//form inputs
const titleInputValue = editForm.querySelector('.popup__input_type_name');
const descriptionInputValue = editForm.querySelector('.popup__input_type_bio');
const cardLink = document.querySelector('.popup__input_type_url');

function toggleModalWindow(modal) {
    modal.classList.toggle('popup_opened');
    
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = titleInputValue.value;
    profileDescription.textContent = descriptionInputValue.value;
    toggleModalWindow(editProfileModalWindow);
}


editForm.addEventListener('submit', handleFormSubmit);

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

closeAddCardModalButton.addEventListener('click', () => {
    toggleModalWindow(addCardModalWindow);
});

closeImagePopupButton.addEventListener('click', () => {
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
  newCard(data.name, data.link);
  list.prepend(newCard(data.name, data.link));
});

function newCard(title, image) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.getElementsByClassName('card__title')[0];
  const cardLikeButton = cardElement.getElementsByClassName('card__heart')[0];
  const cardDeleteButton = cardElement.getElementsByClassName('card__delete')[0];
  

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

    const popupImage = imageModalWindow.getElementsByClassName('popup__image')[0];
    

    popupImage.src = image;
    popupImage.setAttribute("alt", title);
    popupImageTitle.textContent = title;

    toggleModalWindow(imageModalWindow);
  });

  return cardElement;  
}




addCardSubmitButton.addEventListener("click", event => {
  event.preventDefault();
  const cardTitle = document.querySelector('.popup__input_type_card-title');
  

  newCard(cardTitle.value, cardLink.value);
  cardTitle.value = "";
  cardLink.value = "";
  toggleModalWindow(addCardModalWindow);

  list.prepend(newCard(cardTitle, cardLink);
});
  