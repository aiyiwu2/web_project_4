import Popup from './Popup.js'; 

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupSelector = popupSelector;
    }

    open(name, link) {
        super.open();
        this._popupSelector.querySelector('.popup__image').src = link;
        this._popupSelector.querySelector('.popup__image-title').textContent = name;
    }
}

export default PopupWithImage;