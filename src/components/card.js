import { templateCard, popupAcceptDelete, formAcceptDelete, configForm } from './constants.js'
import { viewCardPhoto, getMyId } from './index.js'
import { toggleButtonState } from './validate.js'
import { openPopup, closePopup } from './modal.js';

//функция создания карточки
export function createCard (dataCard) {
    const galleryCard = templateCard.cloneNode(true);
    const cardElementTitle = galleryCard.querySelector('.card__title');
    const cardElementImage = galleryCard.querySelector('.card__image');
    const cardElementTrashButton = galleryCard.querySelector('.card__btn_trash')
    const cardElementLikeButton = galleryCard.querySelector('.card__btn');
    const likesCounter = galleryCard.querySelector('.card__likes');
    cardElementTitle.textContent = dataCard.name;
    cardElementImage.src = dataCard.link;
    cardElementImage.alt = dataCard.name;
    likesCounter.textContent = dataCard.likes.length;
    cardElementTrashButton.addEventListener('click', (evt) => {
        AcceptDeleteCard(evt);
    });
    cardElementLikeButton.addEventListener('click', likeCard);
    cardElementImage.addEventListener('click', viewCardPhoto);

    // const userId = dataCard.owner._id;
    // console.log(userId);
    // const cardId = dataCard._id;
    return galleryCard;
}

//Функция удаления карточки
// export function deleteCard(evt) {
//     evt.target.closest('.card').remove();
// };

//Функция "нравится"
function likeCard(evt) {
    evt.target.classList.toggle('card__btn_like-active');

}

////
//Функция удаления карточки 
export function AcceptDeleteCard(evt) {
    openPopup(popupAcceptDelete);
    toggleButtonState(formAcceptDelete.querySelector(configForm.submitButtonSelector), true, configForm);
    formAcceptDelete.addEventListener('submit', function (submitEvt) {
        submitEvt.preventDefault();
        evt.target.closest('.card').remove();
        closePopup(popupAcceptDelete);
    });
};

// formAcceptDelete.addEventListener('submit', (submitEvt) => {
//     submitEvt.preventDefault();
//     // const cardElement = formAcceptDelete.closest('.card');
//     const cardElement = submitEvt.target.closest('.popup').parentNode.querySelector('.card');
//     // console.log(submitEvt.target);
//     deleteCard(cardElement);
//     closePopup(popupAcceptDelete);
// });