import { imageModalWindow, toggleModalWindow, popupImage, popupImageTitle } from "./utils.js";

class Card {
    constructor({ data, handleCardClick }, cardTemplateSelector) {
        this._text = data.name;
        this._link = data.link;
        this._data = data;
        this._cardTemplate = document.querySelector(cardTemplateSelector).content.querySelector('.card');
        this._handleCardClick = handleCardClick;
    }

    _handleLikeIcon(event) {
      event.target.classList.toggle('card__heart_mode_like');
    };

    _handleDeleteCard() {
      this._card.remove();
    };

    _handlePreviewPicture() {
      popupImage.src = this._link;
      popupImage.setAttribute("alt", this._text);
      popupImageTitle.textContent = this._text;
  
      toggleModalWindow(imageModalWindow);
    };

    _addEventListeners() {
        const cardImage = this._card.querySelector('.card__image');
        const cardLikeButton = this._card.querySelector('.card__heart');
        const cardDeleteButton = this._card.querySelector('.card__delete');

        cardLikeButton.addEventListener('click', this._handleLikeIcon);
        
          cardDeleteButton.addEventListener('click', this._handleDeleteCard.bind(this));
        
          cardImage.addEventListener('click', () => {
            this._handleCardClick(this._text, this._link);
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

/* Add these to index.js

const imageModal = new PopupWithImage('.popup_type_image');
imageModal.setEventListeners();

new Card(
  {
    data: {..},
    handleCardClick: () => {
      imageModal.open();
    },
    'card-template'
  }
)

*/