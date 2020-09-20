import handleCardClick from "./index.js";
import imageModalWindow from "./index.js";
import popupImage from "./index.js";
import activeModal from "./index.js";


function handleModalEsc(event) {
    if (event.key === "Escape") {
      toggleModalWindow(activeModal);
  }
  }

  const handleModalClick = ({ target }) => {
    if (target.classList.contains("popup") || target.classList.contains("popup__close")) {
      toggleModalWindow(activeModal);
    }
};

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



class Card {
    constructor(data, cardTemplateSelector) {
        this._text = data.name;
        this._link = data.link;
        this._data = data;
        this._cardTemplate = document.querySelector(cardTemplateSelector).content.querySelector('.card');
    }

    _handleLikeIcon(event) {
      event.target.classList.toggle('card__heart_mode_like');
    };

    _handleDeleteCard(event) {
      event.target.closest('.card').remove();
    };

    _handlePreviewPicture() {
      popupImage.src = this._data.link;
      popupImage.setAttribute("alt", this._text);
      popupImageTitle.textContent = this._text;
  
      toggleModalWindow(imageModalWindow);
    };

    _addEventListeners() {
        const cardImage = this._card.querySelector('.card__image');
        const cardLikeButton = this._card.querySelector('.card__heart');
        const cardDeleteButton = this._card.querySelector('.card__delete');

        cardLikeButton.addEventListener('click', this._handleLikeIcon);
        
          cardDeleteButton.addEventListener('click', this._handleDeleteCard);
        
          cardImage.addEventListener('click', () => {
            handleCardClick(this._data);
          });
    }

    getCardElement() {
        this._card = this._cardTemplate.cloneNode(true); 
        const cardImage = this._card.querySelector('.card__image');
        
        const cardTitle = this._card.querySelector('.card__title');
        
      
        cardTitle.textContent = this._text;
        cardImage.setAttribute("alt", this._text);
        cardImage.style.backgroundImage = `url(${this._link})`;
      
        this._addEventListeners();
      
        return this._card;  
      };
}

export default Card;
/*
const card = new Card({ text: '123', link: 'src'}, '.card-template');

card.getCardElement()
*/
