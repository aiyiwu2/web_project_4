let profileEdit = document.querySelector(".profile__edit");

let popup = document.querySelector(".popup");

let popupClose = document.querySelector(".popup__close");

let formElement = document.querySelector(".popup__container");

let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_bio");
let titleInput = document.querySelector(".profile__title");
let subtitleInput = document.querySelector(".profile__subtitle");

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