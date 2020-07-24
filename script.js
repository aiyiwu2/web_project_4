const profileEdit = document.querySelector(".profile__edit");

const popup = document.querySelector(".popup");

const popupClose = document.querySelector(".popup__close");

const formElement = document.querySelector(".popup__container");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_bio");
const titleInput = document.querySelector(".profile__title");
const subtitleInput = document.querySelector(".profile__subtitle");

function openPopup() {
    popup.classList.add("popup_opened");

    nameInput.value = titleInput.textContent; 
    jobInput.value = subtitleInput.textContent;
} 

function closePopup() {
    popup.classList.remove("popup_opened");
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    

    
    titleInput.textContent = nameInput.value;
    subtitleInput.textContent = jobInput.value;

    closePopup();
}

profileEdit.addEventListener('click', openPopup);

popupClose.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);