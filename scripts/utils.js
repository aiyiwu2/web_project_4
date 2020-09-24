//import handleModalEsc from "./index.js";

export const imageModalWindow = document.querySelector('.popup_type_image');

export const popupImage = imageModalWindow.querySelector('.popup__image');
export const popupImageTitle = imageModalWindow.querySelector('.popup__image-title');

export let activeModal = null;

export function handleCardClick(data) {
    popupImage.src = data.link;
    popupImage.setAttribute("alt", data.name);
    popupImageTitle.textContent = data.name;
  
    toggleModalWindow(imageModalWindow);
  }

export default function toggleModalWindow(modal) {
    console.log(modal);
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

export function handleModalEsc(event) {
    if (event.key == "Escape") {
      toggleModalWindow(activeModal);
  }
  }

 export const handleModalClick = ({ target }) => {
    if (target.classList.contains("popup") || target.classList.contains("popup__close")) {
      toggleModalWindow(activeModal);
    }
};

