import "../pages/index.css";
import Card from './Card.js';
import Section from './Section.js';
import { FormValidator, defaultConfig } from './FormValidation.js';
import { editAvatarModalWindow, addCardModalWindow, editProfileModalWindow, deleteCardModalWindow, list, imageModalWindow, profileTitle, profileDescription, profilePicture, editAvatarForm, editProfileForm, addCardForm, profileEditOpenButton, addCardOpenButton, avatarOpenButton, deleteCardOpenButton, profileAvatarEdit, editProfileSubmitButton, editAvatarSubmitButton, addCardSubmitButton, deleteCardSubmitButton, titleInput, descriptionInput } from "./utils.js";
import Api from './Api.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const addFormValidator = new FormValidator(defaultConfig, addCardForm);
const editAvatarFormValidator = new FormValidator(defaultConfig, editAvatarForm);

export const userInfo = new UserInfo(profileTitle, profileDescription);

export const deleteCardPopup = new PopupWithForm({
  popupSelector: deleteCardModalWindow
});

export const popupImageInstance = new PopupWithImage(imageModalWindow);

export const editProfilePopup = new PopupWithForm({
  popupSelector: editProfileModalWindow, 
  submitPopup: (data) => {
    editProfileSubmitButton.textContent = "Saving...";
    api.setUserInfo({
      name: data.name,
      about: data.about

    })
    .then(res => {
      userInfo.setUserInfo(res.name, res.about)
    })
    userInfo.setUserInfo(titleInput.value, descriptionInput.value)
    editProfileSubmitButton.textContent = "Save";
  }
});

export const editAvatarPopup = new PopupWithForm({
  popupSelector: editAvatarModalWindow,
  submitPopup: handleAvatarEdit
});

function handleAvatarEdit(data) {
  editAvatarSubmitButton.textContent = "Saving...";
  api.setUserAvatar({
    avatar: data.avatar
  })
  .then(res => {
    profilePicture.src = res.avatar;
    editAvatarSubmitButton.textContent = "Save";
    editAvatarPopup.close();
  })
  .catch(err => console.log(err));
}

function showAvatarEdit() {
profileAvatarEdit.classList.toggle('profile__avatar-edit_visible');
}

export function openAvatarEdit() {
editAvatarPopup.open();
}

export function openProfileEdit() {
titleInput.value = profileTitle.textContent;  
descriptionInput.value = profileDescription.textContent;
editProfilePopup.open();
}

function openDeleteCard() {
deleteCardPopup.open();
}

deleteCardPopup.setEventListeners();
popupImageInstance.setEventListeners();
editProfilePopup.setEventListeners();
editAvatarPopup.setEventListeners();

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-5",
  headers: {
    authorization: "ed300335-e1bd-4128-98db-8b10403a3044",
    "Content-Type": "application/json"
  }
});

//loads user information from the server
api.getUserInfo()
.then(res => {
  userInfo.setUserInfo(res.name, res.about, res._id, res.avatar)
  profilePicture.src = res.avatar;
})
.then(() => {
  //displays all users' cards
api.getCardList()
.then(res => {

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
              deleteCardSubmitButton.textContent = "Deleting...";
              api.removeCard(cardID)
              .then(() => {
                card.handleDeleteCard(cardID);
                deleteCardPopup.close();
                deleteCardSubmitButton.textContent = "Yes";
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
        }, userInfo._id, ".card-template")
        const generatedCard = card.getCardElement();

        console.log(card._data.owner._id)
        console.log(card)
        console.log(userInfo)
          console.log(userInfo._id)
          console.log(userInfo._name)
          console.log(userInfo._about)
          console.log(card._data.owner._id === userInfo._id)
         // console.log(userInfo._about._id)
        // TODO
        // if (card._data.owner._id === userInfo._id) {
        //   deleteCardOpenButton.classList.add("card__delete_mode_visible");
        // }
        card.displayLikeCount(card._data.likes.length)
        displayCards.addItem(generatedCard); 

      }
     }, 
      list);
      displayCards.renderer();

      const addCardPopup = new PopupWithForm({
        popupSelector: addCardModalWindow, 
          submitPopup: (data) => {
            console.log(data)
            console.log(res)
            addCardSubmitButton.textContent = "Creating...";
            api.addCard({ name: data.name, link: data.link })
            .then((res) => {
              addCardSubmitButton.textContent = "Create";
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
              }, userInfo._id, ".card-template");
              const generatedCard = card.getCardElement();
              console.log(card)
              // if (card._data.owner._id === userInfo._id) {
              //   deleteCardOpenButton.classList.add("card__delete_mode_visible");
              // }
              //card.displayLikeCount(card._data.likes.length)
              displayCards.prependItem(generatedCard); 
            }) 
          }
          
        });
        addCardPopup.setEventListeners();

        addCardOpenButton.addEventListener('click', () => {
          addCardPopup.open();
        })
    }
)
})
//displays all users' cards
// api.getCardList()
// .then(res => {

//   const displayCards = new Section(
//     { 
//       items: res, 
//       renderer: (data) => {
//         const card = new Card({ 
//           data, 
//           handleCardClick: (name, link) => {
//             popupImageInstance.open(name, link);
//           },
//           handleDeleteClick: (cardID) => {
//             deleteCardPopup.open(cardID);
//             deleteCardPopup.submitData(() => {
//               api.removeCard(cardID)
//               .then(() => {
//                 card.handleDeleteCard(cardID);
//                 deleteCardPopup.close();
//               })
//               .catch(error => console.log(error))
//             })
//           },
//           handleLikeClick: (cardID) => {
//             if (card.heart.classList.contains("card__heart_mode_like")) {
//               card.heart.classList.remove("card__heart_mode_like");
//               api.deleteCardLike(cardID)
//               .then((res) => {
//                 card.displayLikeCount(res.likes.length)
//               })
//               .catch((error) => console.log(error))
//             } else {
//               card.heart.classList.add("card__heart_mode_like");
//               api.addCardLike(cardID)
//               .then((res) => {
//                 card.displayLikeCount(res.likes.length)
//               })
//               .catch((error) => console.log(error))
//             }
//           }
//         }, ".card-template")
//         const generatedCard = card.getCardElement();

//         console.log(card._data.owner._id)
//         console.log(card)
//         console.log(userInfo)
//           console.log(userInfo._id)
//           console.log(userInfo._about)
//           console.log(card._data.owner._id === userInfo._id)
//          // console.log(userInfo._about._id)
//         // TODO
//         if (card._data.owner._id === userInfo._id) {
//           deleteCardOpenButton.classList.add("card__delete_mode_visible");
//         }
//         card.displayLikeCount(card._data.likes.length)
//         displayCards.addItem(generatedCard); 

//       }
//      }, 
//       list);
//       displayCards.renderer();

//       const addCardPopup = new PopupWithForm({
//         popupSelector: addCardModalWindow, 
//           submitPopup: (data) => {
//             addCardModalWindow.querySelector(".popup__button").textContent = "Creating...";
//             api.addCard({ name: data.name, link: data.link })
//             .then((res) => {
//               const card = new Card({
//                 data,
//                 handleCardClick: (name, link) => {
//                   popupImageInstance.open(name, link);
//                 },
//                 handleDeleteClick: (cardID) => {
//                   deleteCardPopup.open(cardID);
//                   deleteCardPopup.submitData(() => {
//                     api.removeCard(cardID)
//                     .then((res) => {
//                       card.handleDeleteCard(cardID);
//                       deleteCardPopup.close();
//                     })
//                     .catch(error => console.log(error))
//                   })
//                 },
//                 handleLikeClick: (cardID) => {
//                   if (card.heart.classList.contains("card__heart_mode_like")) {
//                     card.heart.classList.remove("card__heart_mode_like");
//                     api.deleteCardLike(cardID)
//                     .then((res) => {
//                       card.displayLikeCount(res.likes.length)
//                     })
//                     .catch((error) => console.log(error))
//                   } else {
//                     card.heart.classList.add("card__heart_mode_like");
//                     api.addCardLike(cardID)
//                     .then((res) => {
//                       card.displayLikeCount(res.likes.length)
//                     })
//                     .catch((error) => console.log(error))
//                   }
//                 }
//               }, ".card-template");
//               const generatedCard = card.getCardElement();
//               displayCards.addItem(generatedCard); 
//             }) 
//           }
          
//         });
//         addCardPopup.setEventListeners();

//         addCardOpenButton.addEventListener('click', () => {
//           addCardPopup.open();
//         })
//     }
// )

avatarOpenButton.addEventListener('mouseenter', showAvatarEdit);
avatarOpenButton.addEventListener('mouseleave', showAvatarEdit);

avatarOpenButton.addEventListener('click', () => {
  openAvatarEdit();
})

profileEditOpenButton.addEventListener('click', () => {
  openProfileEdit();
})

deleteCardOpenButton.addEventListener('click', () => {
  openDeleteCard();
})

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();