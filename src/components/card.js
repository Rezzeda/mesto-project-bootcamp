import { 
    templateCard,
    } from './constants.js'
import { viewCardPhoto } from './modal.js'

//функция создания карточки
export function createCard (dataCard) {
    const galleryCard = templateCard.cloneNode(true);
    const cardElementTitle = galleryCard.querySelector('.card__title');
    const cardElementImage = galleryCard.querySelector('.card__image');
    const cardElementTrashButton = galleryCard.querySelector('.card__btn_trash')
    const cardElementLikeButton = galleryCard.querySelector('.card__btn');
    cardElementTitle.textContent = dataCard.name;
    cardElementImage.src = dataCard.link;
    cardElementImage.alt = dataCard.name;
    cardElementTrashButton.addEventListener('click', deleteCard);
    cardElementLikeButton.addEventListener('click', likeCard);
    cardElementImage.addEventListener('click', viewCardPhoto);
    return galleryCard;
}

//Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
};

//Функция "нравится"
function likeCard(evt) {
    evt.target.classList.toggle('card__btn_like-active')
}