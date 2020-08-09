function removeCard() {
    deleteCard.remove(deleteCard.closest('.card'));
}

  deleteCard.addEventListener('click', removeCard);