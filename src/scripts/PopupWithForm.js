import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleEditProfileFormSubmit, handleAddCardFormSubmit) {
        super(popupSelector);
        this._handleEditProfileFormSubmit = handleEditProfileFormSubmit;
        this._handleAddCardFormSubmit = handleAddCardFormSubmit;
    }

    _getInputValues() {
        this.inputValues = [];
        if (this._popupElement.classList.contains('popup_type_edit-profile')) {
            this.inputValues.push(this._popupElement.querySelector('.popup__input_type_name').value)
            this.inputValues.push(this._popupElement.querySelector('.popup__input_type_bio').value)
        } else if (this._popupElement.classList.contains('popup_type_add-card')) {
            this.inputValues.push(this._popupElement.querySelector('.popup__input_type_card-title').value)
            this.inputValues.push(this._popupElement.querySelector('.popup__input_type_url').value)
        }
        
        return this.inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        if (this._popupElement.classList.contains('popup_type_edit-profile')) {
            this._popupElement.querySelector('.popup__button').addEventListener('click', (event) => {
this._handleEditProfileFormSubmit(event, this._getInputValues())
            });
        } 
        else if (this._popupElement.classList.contains('popup_type_add-card')) {
            this._popupElement.querySelector('.popup__button').addEventListener('click', (event) => {
                this._handleAddCardFormSubmit(event, this._getInputValues())
            });
        }

        this._popupElement.querySelector('.popup__close').addEventListener('click', () => {
            this._popupElement.querySelector('.popup__close').closest('.popup__form').reset();
        })  
    }

    close() {
        super.close();
        this._popupElement.querySelector('.popup__form').reset();
    }
}

export default PopupWithForm;