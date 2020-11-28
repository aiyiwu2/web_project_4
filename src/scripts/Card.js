class Card {
    constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }, userID, cardTemplateSelector) {  
      this._text = data.name;
      this._link = data.link;
      this._data = data;
      this._id = data._id;
      this._userID = userID;
      this._likes = data.likes;
      this._owner = data.owner;
      this._cardTemplate = document.querySelector(cardTemplateSelector).content.querySelector('.card');
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
      this._handleLikeClick = handleLikeClick;
      this._card = this._cardTemplate.cloneNode(true);
      this.heart = this._card.querySelector(".card__heart");
    }

    id() {
      return this._data._id;
    }

    _handleLikeIcon(event) {
      event.target.classList.toggle('card__heart_mode_like');
    };

    handleDeleteCard() {
      this._card.remove();
      this._card = null;
    };

    displayLikeCount(numberOfLikes) {
      this._card.querySelector(".card__heart-score").textContent = numberOfLikes;
    }

    _addEventListeners() {
      const cardImage = this._card.querySelector('.card__image');
      const cardLikeButton = this._card.querySelector('.card__heart');
      const cardDeleteButton = this._card.querySelector('.card__delete');

      cardLikeButton.addEventListener('click', () => {
        this._handleLikeClick(this.id());
      })

      cardDeleteButton.addEventListener('click', () => {
        this._handleDeleteClick(this.id(), this._card)
      });

      cardImage.addEventListener('click', () => {
        this._handleCardClick(this._text, this._link);
      });

      if (this._owner._id !== this._userID) {
        cardDeleteButton.style.display = 'none';
      }
    }

    getCardElement() {
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