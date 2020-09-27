export class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
   inputElement.classList.add(this._settings.inputErrorClass);
   errorElement.textContent = errorMessage;
   errorElement.classList.add(this._settings.errorClass);
    }
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
    }
    _checkInputValidity(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
    }
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._settings.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
            buttonElement.disabled = false;
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
    

    /*
   _showErrorMessage(input, form, {errorClass, inputErrorClass, ...rest}) {
    const error = this._formElement.querySelector("#" + input.id + "-error");
    error.textContent = input.validationMessage;

    error.classList.add(this._settings.errorClass);
    input.classList.add(this._settings.inputErrorClass);
}

_hideErrorMessage(input, form, {errorClass, inputErrorClass, ...rest}) {
    const error = this._formElement.querySelector("#" + input.id + "-error");
    error.textContent = "";

    error.classList.remove(this._settings.errorClass);
    input.classList.remove(this._settings.inputErrorClass);
}

_checkInputValidity(input, form, rest) {
    if (input.validity.valid) {
        this._hideErrorMessage(input, form, rest);
    } else {
        this._showErrorMessage(input, form, rest);
    }
}

_toggleButtonState(inputs, button, {inactiveButtonClass ,...rest}) {
    const isValid = inputs.every((input) => input.validity.valid);

    if (isValid) {
        button.classList.remove(this._settings.inactiveButtonClass);
    } else {
        button.classList.add(this._settings.inactiveButtonClass);
    }
}

enableValidation({formSelector, inputSelector, submitButtonSelector, ...rest}) {
    const forms = [...document.querySelectorAll(this._settings.formSelector)];

    forms.forEach((form) => {
        form.addEventListener("submit", ((e) => {
            e.preventDefault();
        }));

        const inputs = [...form.querySelectorAll(this._settings.inputSelector)];
        const button = form.querySelector(this._settings.submitButtonSelector);

        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input, form, rest);
                this._toggleButtonState(inputs, button, rest);
            })

        })
    })
}
*/
}

//export default FormValidator;


export const defaultConfig = {
        formSelector: ".popup__form",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__button",
        inactiveButtonClass: "popup__button_disabled",
        inputErrorClass: "popup__input_type_error",
        errorClass: "popup__error_visible"
};

//const editForm = document.querySelector('.popup_type_add-card .popup__form');

//const formValidator = new FormValidator(defaultConfig, editForm);