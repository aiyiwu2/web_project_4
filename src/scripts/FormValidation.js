export class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

   _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
inputElement.classList.add(this._settings.inputErrorClass);
errorElement.textContent = inputElement.validationMessage;
errorElement.classList.add(this._settings.errorClass);
   }

_hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
}

_checkInputValidity(inputElement, form, rest) {
    if (inputElement.validity.valid) {
        this._hideInputError(inputElement, form, rest);
    } else {
        this._showInputError(inputElement, form, rest);
    }
}

_toggleButtonState(inputs, button) {
    const isValid = inputs.every((input) => input.validity.valid);

    if (isValid) {
        button.classList.remove(this._settings.inactiveButtonClass);
    } else {
        button.classList.add(this._settings.inactiveButtonClass);
    }
}

_setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
    });
});
}

enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    this._setEventListeners();
}

}


export const defaultConfig = {
        formSelector: ".popup__form",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__button",
        inactiveButtonClass: "popup__button_disabled",
        inputErrorClass: "popup__input_type_error",
        errorClass: "popup__error_visible"
};