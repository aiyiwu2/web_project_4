let profileEdit = document.querySelector(".profile__edit");

let popup = document.querySelector(".popup");

let popupClose = document.querySelector(".popup__close");



function openPopup() {
    popup.classList.add("popup_opened");
} 

function closePopup() {
    popup.classList.remove("popup_opened");
}

profileEdit.addEventListener('click', openPopup);

popupClose.addEventListener('click', closePopup);


let formElement = document.querySelector(".popup__container");


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let nameInput = document.querySelector(".popup__input_type_name");
    let jobInput = document.querySelector(".popup__input_type_bio");
    let titleInput = document.querySelector(".profile__title");
    let subtitleInput = document.querySelector(".profile__subtitle");

    
    titleInput.textContent = nameInput.value;
    subtitleInput.textContent = jobInput.value;

    closePopup();
}


formElement.addEventListener('submit', formSubmitHandler);