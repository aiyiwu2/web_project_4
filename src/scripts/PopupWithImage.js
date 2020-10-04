import Popup from './Popup.js'; 

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(name, link) {
        this._popupElement.querySelector('.popup__image').src = link;
        this._popupElement.querySelector('.popup__image-title').textContent = name;
        super.open();
    }
}

export default PopupWithImage;