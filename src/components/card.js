import { templateCard, popupAcceptDelete, formAcceptDelete, configForm } from './constants.js'
import { viewCardPhoto, myId } from './index.js'
import { toggleButtonState } from './validate.js'
import { openPopup, closePopup } from './modal.js';
import { removeCard, addLike, removeLike } from './api.js';

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
    //просмотр карточки
    cardElementImage.addEventListener('click', viewCardPhoto);

    likesCounter.textContent = dataCard.likes.length;
    const cardId = dataCard._id;

    //удаляем значок корзины с чужих карточек
    if(dataCard.owner._id !== myId) {
        cardElementTrashButton.remove();
    }
    // удаление карточки
    cardElementTrashButton.addEventListener('click', (evt) => {
        AcceptDeleteCard(evt, cardId);
    });

    //для отображения поставленных мной лайков после выгрузки карточек
    if (isObjectWithIdInArray(dataCard.likes)) {
        cardElementLikeButton.classList.add('card__btn_like-active');;
    };
    cardElementLikeButton.addEventListener('click', (evt) => {
        const isliked = cardElementLikeButton.classList.contains('card__btn_like-active');
        if (!isliked) {
            addLike(cardId)
            .then((updateCard) => {
                likesCounter.textContent = updateCard.likes.length;
                cardElementLikeButton.classList.add('card__btn_like-active');
            })
            .catch(error => {
                console.error('Error liking card:', error);
            });
        } else {
            removeLike(cardId)
            .then((updateCard) => {
                likesCounter.textContent = updateCard.likes.length;
                cardElementLikeButton.classList.remove('card__btn_like-active');
            })
            .catch(error => {
                console.error('Error unliking card:', error);
            });
        }
    });
    return galleryCard;
}

//функция проверки есть ли мой лайк в списке выгруженных карточек
function isObjectWithIdInArray(arr) {
    return arr.some(obj => obj.hasOwnProperty('_id') && obj._id === myId);
}
//Функция удаления карточки - простая
// export function deleteCard(evt) {
//     evt.target.closest('.card').remove();
// };

//Функция "нравится" (без сервера)
// function likeCard(evt) {
//     evt.target.classList.toggle('card__btn_like-active');
// }

//Функция удаления карточки с подтверждением
export function AcceptDeleteCard(evt, cardId) {
    openPopup(popupAcceptDelete);
    toggleButtonState(formAcceptDelete.querySelector(configForm.submitButtonSelector), true, configForm);
    formAcceptDelete.addEventListener('submit', function (submitEvt) {
        submitEvt.preventDefault();
        removeCard(cardId)
            .then(() => {
                evt.target.closest('.card').remove();
                closePopup(popupAcceptDelete);
            })
            .catch((error) => {
                console.error(`Ошибка при удалении карточки: ${error}`);
            });
    });
};