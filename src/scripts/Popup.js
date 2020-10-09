class Popup {
    constructor(popupSelector) {
        this._popupElement = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(e) {
        if(e.which == 27) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup')) {
                this.close();
            }
        })
    }
}

export default Popup;

// || !e.target.closest('popup__container'))

/* Add these to index.js

const editPopup = new PopupWithForm('.popup_type_edit-profile');
editPopup.setEventListeners()
const addCardPopup = new PopupWithForm('.popup_type_add-card');
addCardPopup.setEventListeners()
const imagePopup = new PopupWithImage('popup_type_image');
imagePopup.setEventListeners()
*/