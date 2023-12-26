import '../pages/index.css';
import { initialCards } from './initial-cards.js'
import { 
    editProfileButton,
    popupEditProfile,
    popupAddImage,
    nameInput,
    descriptionInput,
    formEditProfile,
    newName,
    newDescription,
    closeButtons,
    addCardButton,
    placeNameInput,
    itemLinkInput,
    templateCard,
    listGalleryCards,
    formAddImage
    } from './constants.js'
import { enableValidation } from './validate.js'
import { openPopup, closePopup, editProfile, } from './modal.js'
import { createCard } from './card.js'

// добавляем обработчик события кнопке редактирования профиля для открытия модального окна c заполнением данных из профиля
editProfileButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    nameInput.value = newName.textContent;
    descriptionInput.value = newDescription.textContent;
});

// функция закрытия попапа по нажатию на крестик
closeButtons.forEach((item) => {
    item.addEventListener('click', (evt) => {
        const popupClosest = evt.target.closest('.popup');
        closePopup(popupClosest);
    });
});

//Функция сохранения внесенных в формы popup изменений при рекдактиронии профиля
formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    editProfile();
    closePopup(popupEditProfile);
});

//добавляем обработчик события кнопке добавления карточки для открытия модального окна
addCardButton.addEventListener('click', () => {
    openPopup(popupAddImage);
});

//функция добавления карточек из массива
initialCards.forEach((dataCard) => {
    listGalleryCards.append(createCard(dataCard));
});

// функция создания карточки из введенных данных
function addCardFromPopup() {
    const newCardData = {
        name: placeNameInput.value,
        link: itemLinkInput.value,
    }
    const newCard = createCard(newCardData);
    listGalleryCards.prepend(newCard);
    closePopup(popupAddImage);
};

formAddImage.addEventListener('submit', (evt) => {
    evt.preventDefault();
    addCardFromPopup();
    evt.target.reset();
});

// Поле закрытия Popup при нажатии на Overlay
const popupCloseClickOverlay = document.querySelectorAll('.popup');   

// Закрытие всех Popup при нажатии на Overlay
popupCloseClickOverlay.forEach((item) => {
    item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
        const overlayClosest = evt.target.closest('.popup');
        closePopup(overlayClosest);
        };
    });
});

// Добавление обработчика события клавиатуры
document.addEventListener('keydown', handleEscKey);

// Функция обработки события клавиатуры
function handleEscKey(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

const configForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_disabled',
    inputErrorClass: 'popup__item_invalid',
}

//вкл валидацию
enableValidation(configForm);