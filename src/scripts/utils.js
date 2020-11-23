export const editAvatarModalWindow = document.querySelector('.popup_type_edit-avatar');
export const addCardModalWindow = document.querySelector('.popup_type_add-card');
export const editProfileModalWindow = document.querySelector('.popup_type_edit-profile');
export const deleteCardModalWindow = document.querySelector('.popup_type_delete-card');
export const imageModalWindow = document.querySelector('.popup_type_image');

export const addCardForm = addCardModalWindow.querySelector('.popup__form');
export const editProfileForm = editProfileModalWindow.querySelector('.popup__form');
export const editAvatarForm = editAvatarModalWindow.querySelector('.popup__form');

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__subtitle');

export const popupImage = imageModalWindow.querySelector('.popup__image');
export const popupImageTitle = imageModalWindow.querySelector('.popup__image-title');

export const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');

export const profileEditOpenButton = document.querySelector('.profile__edit');
export const addCardOpenButton = document.querySelector('.profile__add-button');
export const avatarOpenButton = document.querySelector('.profile__avatar');
export const deleteCardOpenButton = cardTemplate.querySelector('.card__delete');

export const profileAvatarEdit = document.querySelector('.profile__avatar-edit');

export const editProfileSubmitButton = editProfileModalWindow.querySelector('.popup__button');
export const editAvatarSubmitButton = editAvatarModalWindow.querySelector('.popup__button');

export const titleInput = document.querySelector(".popup__input_type_name")
export const descriptionInput = document.querySelector('.popup__input_type_bio');
export const cardLink = document.querySelector('.popup__input_type_url');
export const cardTitle = document.querySelector('.popup__input_type_card-title');

export const list = document.querySelector('.cards');

// export const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
//   },
//   {
//     name: "Lake Louise",
//     link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
//   },
//   {
//     name: "Latemar",
//     link: "https://code.s3.yandex.net/web-code/latemar.jpg"
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://code.s3.yandex.net/web-code/lago.jpg"
//   }
// ];