import Popup from './Popup.js'; 

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(link, caption) {
        this._popupElement.querySelector('.popup__image').src = link;
        this._popupElement.querySelector('.popup__image-title').textContent = caption;
        super.open();
    }
}

export default PopupWithImage;