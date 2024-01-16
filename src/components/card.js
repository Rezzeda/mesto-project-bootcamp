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
    // cardElementImage.addEventListener('click', viewCardPhoto);
    cardElementImage.addEventListener('click', () => {
        viewCardPhoto(dataCard);
    });

    likesCounter.textContent = dataCard.likes.length;
    const cardId = dataCard._id;

    // //удаляем значок корзины с чужих карточек
    // if(dataCard.owner._id !== myId) {
    //     cardElementTrashButton.remove();
    // } else {
    // // удаление карточки
    // cardElementTrashButton.addEventListener('click', (evt) => {
    //     acceptDeleteCard(evt, cardId);
    // });
    // }

    //удаляем значок корзины с чужих карточек
    if(dataCard.owner._id !== myId) {
        cardElementTrashButton.remove();
    } else {
    // удаление карточки без подтверждения
    cardElementTrashButton.addEventListener('click', (evt) => {
        deleteCard(evt, cardId);
    });
    //удаление карточки с подтверждением
    // cardElementTrashButton.addEventListener('click', (evt) => {
    //     acceptDeleteCard(evt, cardId);
    // });
    //     cardElementTrashButton.addEventListener('click', () => {
    //     handleClickDelete(dataCard);
    // });
    }

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
                console.error(`Ошибка при удалении карточки: ${error}`);
            });
        } else {
            removeLike(cardId)
            .then((updateCard) => {
                likesCounter.textContent = updateCard.likes.length;
                cardElementLikeButton.classList.remove('card__btn_like-active');
            })
            .catch(error => {
                console.error(`Ошибка при удалении карточки: ${error}`);
            });
        }
    });
    return galleryCard;
}

//функция проверки есть ли мой лайк в списке выгруженных карточек
function isObjectWithIdInArray(arr) {
    return arr.some(obj => obj.hasOwnProperty('_id') && obj._id === myId);
}

//Функция удаления карточки - без подтверждения
export function deleteCard(evt, cardId) {
    removeCard(cardId)
        .then(() => {
            evt.target.closest('.card').remove();
        })
        .catch((error) => {
            console.error(`Ошибка при удалении карточки: ${error}`);
        })
};

//Функция "нравится" (без сервера)
// function likeCard(evt) {
//     evt.target.classList.toggle('card__btn_like-active');
// }

//Функция удаления карточки с подтверждением
// export function acceptDeleteCard(evt, cardId) {
//     openPopup(popupAcceptDelete);
//     toggleButtonState(formAcceptDelete.querySelector(configForm.submitButtonSelector), true, configForm);
//     formAcceptDelete.addEventListener('submit', function (submitEvt) {
//         submitEvt.preventDefault();
//         submitEvt.submitter.textContent = 'Удаление...';
//         removeCard(cardId)
//             .then(() => {
//                 evt.target.closest('.card').remove();
//                 closePopup(popupAcceptDelete);
//             })
//             .catch((error) => {
//                 console.error(`Ошибка при удалении карточки: ${error}`);
//             })
//             .finally(() => {
//                 submitEvt.submitter.textContent = 'Да';
//             });
//     });
// };

// formAcceptDelete.addEventListener('submit', (submitEvt) => {
//     submitEvt.preventDefault();
//     handleDeleteSubmit(submitEvt);
//     // closePopup(popupAcceptDelete);
// });

// // переменная для карточки к удалению
// let  cardForDelete = null;

// const handleClickDelete = async (dataCard) => {
//     cardForDelete = {
//         id: dataCard._id,
//         // element: dataCard
//         element: createCard(dataCard)
//     };
//     openPopup(popupAcceptDelete);
//     // toggleButtonState(formAcceptDelete.querySelector(configForm.submitButtonSelector), true, configForm);
// }

// function handleDeleteSubmit (evt) {
//     evt.preventDefault();
//     if (!cardForDelete) return;
//     // console.log(evt);
//     evt.submitter.textContent = 'Удаление...';
//     removeCard(cardForDelete.id)
//     .then(() => {
//         // console.log(updateCard);
//         // evt.target.closest('.card').remove();
//         cardForDelete.element.remove();
//         // handleDeleteCardClick(cardForDelete.element);
//         closePopup(popupAcceptDelete);
//         // cardForDelete = null;
//     })
//     .catch((error) => {
//         console.error(`Ошибка при удалении карточки: ${error}`);
//     })
//     .finally(() => {
//         evt.submitter.textContent = 'Удалить';
//     });
// };

// function handleDeleteCardClick (element) {
//     element.remove();
//     // closePopup(popupAcceptDelete);
// }