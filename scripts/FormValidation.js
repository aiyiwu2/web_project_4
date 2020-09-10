class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    _showInputError() {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
   inputElement.classList.add(this._settings.inputErrorClass);
   errorElement.textContent = errorMessage;
   errorElement.classList.add(this._settings.errorClass);
    }
    _hideInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
    }
    _checkInputValidity() {
        const errorElement = formElement.querySelector(`#${inputElement}`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
    }
    _hasInvalidInput() {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    _toggleButtonState() {
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add(inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }
    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = formElement.querySelector(this._settings.submitButtonSelector);

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

export default FormValidator;


const defaultConfig = {
        formSelector: ".popup__form",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__button",
        inactiveButtonClass: "popup__button_disabled",
        inputErrorClass: "popup__input_type_error",
        errorClass: "popup__error_visible"
};

const editForm = document.querySelector('.popup_type_add-card .popup__form');

const formValidator = new FormValidator(defaultConfig, editForm);