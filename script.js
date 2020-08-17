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
  const deleteCard = document.querySelector('.card__delete');
  const addCardSubmitButton = addCardModalWindow.querySelector('.popup__save');

  //profile
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__subtitle');

  //form inputs
  const titleInputValue = editForm.querySelector('.popup__input_type_name');
  const descriptionInputValue = editForm.querySelector('.popup__input_type_bio');

  function toggleModalWindow(modal) {
      modal.classList.toggle('popup_opened');
      
  }

  function formSubmitHandler(evt) {
      evt.preventDefault();
      profileTitle.textContent = titleInputValue.value;
      profileDescription.textContent = descriptionInputValue.value;
      toggleModalWindow(editProfileModalWindow);
  }


  editForm.addEventListener('submit', formSubmitHandler);

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
      const cardElement = cardTemplate.cloneNode(true);

      const cardImage = cardElement.querySelector('.card__image');
      const cardTitle = cardElement.querySelector('.card__title');
      const cardLikeButton = cardElement.querySelector('.card__heart');
      const cardDeleteButton = cardElement.querySelector('.card__delete');
      

      cardTitle.textContent = data.name;
      cardImage.style.backgroundImage = `url(${data.link})`;

      cardLikeButton.addEventListener('click', () => {
        
        cardLikeButton.classList.toggle('card__heart_mode_like');
        
      });

      cardDeleteButton.addEventListener('click', () => {
        const cardRemove = cardDeleteButton.closest('.card');
        cardRemove.remove();
      });

      cardImage.addEventListener('click', () => {

        const popupImage = imageModalWindow.querySelector('.popup__image');
        const popupImageTitle = imageModalWindow.querySelector('.popup__image-title');

        popupImage.src = data.link;
        popupImageTitle.textContent = data.name;

        toggleModalWindow(imageModalWindow);
      });

      list.prepend(cardElement);

      

      
  });

  function addCard(cardTitle, cardLink) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__image').style.backgroundImage = `url('${cardLink}')`;
  
    list.prepend(cardElement);
  }
  
  addCardSubmitButton.addEventListener("click", event => {
    event.preventDefault();
    const cardTitle = document.querySelector('.popup__input_type_card-title');
    const cardLink = document.querySelector('.popup__input_type_url');
  
    addCard(cardTitle.value, cardLink.value);
    cardTitle.value = "";
    cardLink.value = "";
    toggleModalWindow(addCardModalWindow);
  });
  