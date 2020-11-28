import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor({ popupSelector, submitPopup }) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._submitPopup = submitPopup;
        this._formElement = popupSelector.querySelector(".popup__form");
    }

    _getInputValues() {
        this._inputList = this._formElement.querySelectorAll(".popup__input");
        this._inputValues = {};
        this._inputList.forEach(
            (input) => (this._inputValues[input.name] = input.value));
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this._submitPopup(this._getInputValues());
            this.close();
        })
    }

    close() {
        super.close();
        this._popupSelector.querySelector('.popup__form').reset();
    }

    submitData(submit) {
        this._submitPopup = submit;
    }
}

export default PopupWithForm;