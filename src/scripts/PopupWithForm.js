import Popup from './Popup.js';
import { handleEditProfileFormSubmit, handleAddCardFormSubmit } from './utils.js';

class PopupWithForm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    _getInputValues() {
        this._inputValues = [];
        if (this._popupElement.classList.contains('popup_type_edit-profile')) {
            this._inputValues.push(this._popupElement.querySelector('.popup__input_type_name').value)
            this._inputValues.push(this._popupElement.querySelector('.popup__input_type_bio').value)
        } else if (this._popupElement.classList.contains('popup_type_add-card')) {
            this._inputValues.push(this._popupElement.querySelector('.popup__input_type_card-title').value)
            this._inputValues.push(this._popupElement.querySelector('.popup__input_type_url').value)
        }
        
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        if (this._popupElement.classList.contains('popup_type_edit-profile')) {
            this._popupElement.querySelector('.popup__close').addEventListener('click', handleEditProfileFormSubmit);
        } else if (this._popupElement.classList.contains('popup_type_add-card')) {
            this._popupElement.querySelector('.popup__close').addEventListener('click', handleAddCardFormSubmit);
        }
        
    }

    close() {
        super.close();
        this._popupElement.querySelector('.popup__form').querySelectorAll("input").value = "";
    }
}

export default PopupWithForm;