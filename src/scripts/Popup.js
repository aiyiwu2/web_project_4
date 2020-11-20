class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(e) {
        if(e.key == "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popupSelector.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup')) {
                this.close();
            }
        })
    }
}

export default Popup;