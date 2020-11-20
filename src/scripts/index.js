import "../pages/index.css"; // add import of the main stylesheets file
import Card from './Card.js';
import Section from './Section.js';
import { FormValidator, defaultConfig } from './FormValidation.js';
import { initialCards, editAvatarModalWindow, addCardModalWindow, editProfileModalWindow, deleteCardModalWindow, list, imageModalWindow, profileTitle, profileDescription, openAddCard, handleAddCardFormSubmit, formEdit, titleInputValue, descriptionInputValue } from "./utils.js";
import Api from './Api.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import { data } from "jquery";

export const userInfo = new UserInfo(profileTitle, profileDescription);

// fetch("https://around.nomoreparties.co/v1/group-5/users/ed300335-e1bd-4128-98db-8b10403a3044")
// .then(res => res.json())
// .then(response => {
//    console.log(response)
//  })

// fetch("https://around.nomoreparties.co/v1/group-5/cards/")
// .then(res => res.json())
// .then(response => {
//   console.log(response)
// })

// fetch("https://around.nomoreparties.co/v1/groupId/users/me")
// .then(res => res.json())
// .then(response => {
//   console.log(response)
// })

const cardTitleInput = document.querySelector(".popup__input_type_card-title");
const cardURLInput = document.querySelector(".popup__input_type_url");

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-5",
  headers: {
    authorization: "ed300335-e1bd-4128-98db-8b10403a3044",
    "Content-Type": "application/json"
  }
});

export const deleteCardPopup = new PopupWithForm({
  popupSelector: deleteCardModalWindow
});
deleteCardPopup.setEventListeners();
//api.getUserInfo();

//displays all users' cards
api.getCardList()
.then(res => {
  console.log(res)
  const displayCards = new Section(
    { 
      items: res, 
      renderer: (data) => {
        const card = new Card({ 
          data, 
          handleCardClick: (name, link) => {
            popupImageInstance.open(name, link);
          },
          handleDeleteClick: (cardID) => {
            deleteCardPopup.open(cardID);
            deleteCardPopup.submitData(() => {
              api.removeCard(cardID)
              .then(() => {
                card.handleDeleteCard(cardID);
                deleteCardPopup.close();
              })
              .catch(error => console.log(error))
            })
          },
          handleLikeClick: (cardID) => {
            if (card.heart.classList.contains("card__heart_mode_like")) {
              card.heart.classList.remove("card__heart_mode_like");
              api.deleteCardLike(cardID)
              .then((res) => {
                console.log(res)
                card.displayLikeCount(res.likes.length)
              })
              .catch((error) => console.log(error))
            } else {
              card.heart.classList.add("card__heart_mode_like");
              api.addCardLike(cardID)
              .then((res) => {
                console.log(res)
                card.displayLikeCount(res.likes.length)
              })
              .catch((error) => console.log(error))
            }
          }
        }, ".card-template")
        //console.log(res)
        //console.log(res.likes)
        const generatedCard = card.getCardElement();
        //generatedCard.displayLikeCount(res.likes.length)
        displayCards.addItem(generatedCard); 

      }
     }, 
      list);
      displayCards.renderer();

      const addCardPopup = new PopupWithForm({
        popupSelector: addCardModalWindow, 
          submitPopup: (data) => {
            addCardModalWindow.querySelector(".popup__button").textContent = "Creating...";
            data = { name: cardTitleInput.value, link: cardURLInput.value }
            api.addCard(data)
            .then((res) => {
              const card = new Card({
                data,
                handleCardClick: (name, link) => {
                  popupImageInstance.open(name, link);
                },
                handleDeleteClick: (cardID) => {
                  deleteCardPopup.open(cardID);
                  deleteCardPopup.submitData(() => {
                    api.removeCard(cardID)
                    .then((res) => {
                      card.handleDeleteCard(cardID);
                      deleteCardPopup.close();
                    })
                    .catch(error => console.log(error))
                  })
                },
                handleLikeClick: (cardID) => {
                  if (card.heart.classList.contains("card__heart_mode_like")) {
                    card.heart.classList.remove("card__heart_mode_like");
                    api.deleteCardLike(cardID)
                    .then((res) => {
                      card.displayLikeCount(res.likes.length)
                    })
                    .catch((error) => console.log(error))
                  } else {
                    card.heart.classList.add("card__heart_mode_like");
                    api.addCardLike(cardID)
                    .then((res) => {
                      card.displayLikeCount(res.likes.length)
                    })
                    .catch((error) => console.log(error))
                  }
                }
              }, ".card-template");
              const generatedCard = card.getCardElement();
              displayCards.addItem(generatedCard); 
            })
            // const card = new Card({
            //   data,
            //   handleCardClick: (name, link) => {
            //     popupImageInstance.open(name, link);
            //   },
            //   handleDeleteClick: (card) => {
            //     deleteCardPopup.open(card);
            //   }
            // }, ".card-template");
            // const generatedCard = card.getCardElement();
            //   displayCards.addItem(generatedCard); 
          }
          
        });
        addCardPopup.setEventListeners();

        addCardOpenButton.addEventListener('click', () => {
          // console.log(3)
          // console.log(openAddCard)
          //openAddCard();
          addCardPopup.open();
        })
    }
)

//loads user information from the server
api.getUserInfo()
.then(res => {
  userInfo.setUserInfo(res.name, res.about)
})

//displays my cards
const displayCards = new Section(
  { 
    items: initialCards, 
    renderer: (data) => {
      const card = new Card({ 
        data, 
        handleCardClick: (name, link) => {
          popupImageInstance.open(name, link);
        },
        handleDeleteClick: (cardID) => {
          deleteCardPopup.open(cardID);
          deleteCardPopup.submitData(() => {
            api.removeCard(cardID)
            .then(() => {
              card.handleDeleteCard(cardID);
              deleteCardPopup.close();
            })
            .catch(error => console.log(error))
          })
        },
        handleLikeClick: (cardID) => {
          if (card.heart.classList.contains("card__heart_mode_like")) {
            card.heart.classList.remove("card__heart_mode_like");
            api.deleteCardLike(cardID)
            .then((res) => {
              card.displayLikeCount(res.likes.length)
            })
            .catch((error) => console.log(error))
          } else {
            card.heart.classList.add("card__heart_mode_like");
            api.addCardLike(cardID)
            .then((res) => {
              card.displayLikeCount(res.likes.length)
            })
            .catch((error) => console.log(error))
          }
        }
      }, ".card-template")
      const generatedCard = card.getCardElement();
      //generatedCard.displayLikeCount(res.likes.length)
      displayCards.addItem(generatedCard); 
    }
   }, 
    list);
    
displayCards.renderer();

const addCardForm = addCardModalWindow.querySelector('.popup__form');
const editProfileForm = editProfileModalWindow.querySelector('.popup__form');
const editAvatarForm = editAvatarModalWindow.querySelector('.popup__form');

const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const addFormValidator = new FormValidator(defaultConfig, addCardForm);
const editAvatarFormValidator = new FormValidator(defaultConfig, editAvatarForm);

const cardTemplate = document.querySelector('.card-template').content.querySelector('.card'); 

//openButtons
const profileEditOpenButton = document.querySelector('.profile__edit');
const addCardOpenButton = document.querySelector('.profile__add-button');
const avatarOpenButton = document.querySelector('.profile__avatar');
const deleteCardOpenButton = cardTemplate.querySelector('.card__delete');

const profileAvatarEdit = document.querySelector('.profile__avatar-edit');

//Buttons and other DOM elements
const addCardSubmitButton = addCardModalWindow.querySelector('.popup__button');
const editProfileSubmitButton = editProfileModalWindow.querySelector('.popup__button');

const titleInput = document.querySelector(".popup__input_type_name")
const descriptionInput = document.querySelector('.popup__input_type_bio');


export const popupImageInstance = new PopupWithImage(imageModalWindow);
export const editProfilePopup = new PopupWithForm({
  popupSelector: editProfileModalWindow, 
  submitPopup: (data) => {
    editProfileSubmitButton.textContent = "Saving...";

    console.log(data)

    // we need to check the data object, and take name and job from it
    // but names inside this bject might be different, e.g. userName, userDescription
    
    api.setUserInfo({
      name: data.name,
      about: data.about

    })
    .then(res => {
      console.log(res)
      userInfo.setUserInfo(res.name, res.about)
    })
    userInfo.setUserInfo(titleInput.value, descriptionInput.value)
    editProfileSubmitButton.textContent = "Save";
  }
});
// export const addCardPopup = new PopupWithForm({
//   popupSelector: addCardModalWindow, 
//     submitPopup: (data) => {
//       api.addCard(data)
//       .then((res) => {
//         const card = new Card({
//           data,
//           handleCardClick: (name, link) => {
//             popupImageInstance.open(name, link);
//           },
//           handleDeleteClick: (card) => {
//             deleteCardPopup.open(card);
//           }
//         }, ".card-template");
//         const generatedCard = card.getCardElement();
//         displayCards.addItem(generatedCard); 
//       })
//       // const card = new Card({
//       //   data,
//       //   handleCardClick: (name, link) => {
//       //     popupImageInstance.open(name, link);
//       //   },
//       //   handleDeleteClick: (card) => {
//       //     deleteCardPopup.open(card);
//       //   }
//       // }, ".card-template");
//       // const generatedCard = card.getCardElement();
//       //   displayCards.addItem(generatedCard); 
//     }
    
//   });

  function handleAvatarEdit(data) {
    console.log(data)
    loadingAvatar(true, editAvatarModalWindow);
    api.setUserAvatar({
      avatar: data.avatar
    })
    .then(res => {
      console.log(res)
      avatarOpenButton.src = res.avatar;
      loadingAvatar(false, editAvatarModalWindow);
      editAvatarPopup.close();
    })
    .catch(err => console.log(err));
  }
  
  function loadingAvatar(isLoading, popup) {
    if (isLoading) {
      popup.querySelector(".popup__button").textContent = "Saving...";
    } else {
      popup.querySelector(".popup__button").textContent = "Save";
    }
  }

export const editAvatarPopup = new PopupWithForm({
  popupSelector: editAvatarModalWindow,
  submitPopup: handleAvatarEdit
});


//console.log(UserInfo)

//console.log(userInfo)

function showAvatarEdit() {
  profileAvatarEdit.classList.toggle('profile__avatar-edit_visible');
}

export function openAvatarEdit() {
  editAvatarPopup.open();
}

export function openProfileEdit() {
  editProfilePopup.open();
}

function openDeleteCard() {
  // console.log(deleteCardPopup)
  deleteCardPopup.open();
}

avatarOpenButton.addEventListener('mouseenter', showAvatarEdit);
avatarOpenButton.addEventListener('mouseleave', showAvatarEdit);

editAvatarPopup.setEventListeners();
avatarOpenButton.addEventListener('click', () => {
  openAvatarEdit();
})

editProfilePopup.setEventListeners();
profileEditOpenButton.addEventListener('click', () => {
  openProfileEdit();
})

// addCardPopup.setEventListeners();
// addCardOpenButton.addEventListener('click', () => {
//   // console.log(3)
//   // console.log(openAddCard)
//   openAddCard();
// })


deleteCardOpenButton.addEventListener('click', () => {
  openDeleteCard();
})


popupImageInstance.setEventListeners();

//editProfileSubmitButton.addEventListener('click', handleEditProfileFormSubmit);

//addCardSubmitButton.addEventListener('click', handleAddCardFormSubmit);



editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();