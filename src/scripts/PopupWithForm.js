import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor({ popupSelector, submitPopup }) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._submitPopup = submitPopup;
        this._formElement = popupSelector.querySelector(".popup__form");

        // this._handleEditProfileFormSubmit = handleEditProfileFormSubmit;
        // this._handleAddCardFormSubmit = handleAddCardFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._formElement.querySelectorAll(".popup__form");
        this._inputValues = {};
        this._inputList.forEach(
            (input) => (this._inputValues[input.name] = input.value));
        // if (popupSelector.classList.contains('popup_type_edit-profile')) {
        //     this._inputValues.push(popupSelector.querySelector('.popup__input_type_name').value)
        //     this._inputValues.push(popupSelector.querySelector('.popup__input_type_bio').value)
        // } else if (popupSelector.classList.contains('popup_type_add-card')) {
        //     this._inputValues.push(popupSelector.querySelector('.popup__input_type_card-title').value)
        //     this._inputValues.push(popupSelector.querySelector('.popup__input_type_url').value)
        // }
        console.log(this._inputValues)
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
//         if (this._popupElement.classList.contains('popup_type_edit-profile')) {
//             this._popupElement.querySelector('.popup__button').addEventListener('click', (event) => {
// this._handleEditProfileFormSubmit(event, this._getInputValues())
//             });
//         } 
//         else if (this._popupElement.classList.contains('popup_type_add-card')) {
//             this._popupElement.querySelector('.popup__button').addEventListener('click', (event) => {
//                 this._handleAddCardFormSubmit(event, this._getInputValues())
//             });
//         }

//         this._popupElement.querySelector('.popup__close').addEventListener('click', () => {
//             this._popupElement.querySelector('.popup__close').closest('.popup__form').reset();
//         })  

this._formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    this._submitPopup(this._getInputValues());
    this.close();
})
    }

    close() {
        super.close();
        console.log(this._popupSelector)
        this._popupSelector.querySelector('.popup__form').reset();
    }
}

export default PopupWithForm;