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
    listGalleryCards,
    formAddImage,
    popupViewPhoto,
    popupPhoto,
    popupPhotoCaption,
    configForm,
    formAcceptDelete,
    popupAcceptDelete,
    popupChangeAvatar,
    formChangeAvatar,
    changeAvatarButton,
    } from './constants.js'
import { enableValidation, resetFormState,toggleButtonState } from './validate.js'
import { openPopup, closePopup } from './modal.js'
import { createCard, deleteCard } from './card.js'

// добавляем обработчик события кнопке редактирования профиля для открытия модального окна c заполнением данных из профиля
editProfileButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    nameInput.value = newName.textContent;
    descriptionInput.value = newDescription.textContent;
});

// Функция обновления профиля введенными даннными
function editProfile() {
    newName.textContent = nameInput.value;
    newDescription.textContent = descriptionInput.value;
    closePopup(popupEditProfile);
    resetFormState(formEditProfile, configForm);
}

//Функция открытия просмотра изображения карточки
export function viewCardPhoto(evt) {
    openPopup(popupViewPhoto);
    popupPhoto.src = evt.target.closest('.card__image').src;
    popupPhoto.alt = evt.target.closest('.card__image').alt;
    // popupPhotoCaption.textContent = evt.target.closest('.card').textContent;
    popupPhotoCaption.textContent = evt.target.closest('.card__image').alt;

};

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
        closePopup(evt.target);
    });
});

//вкл валидацию
enableValidation(configForm);

// Добавляем обработчик события для формы изменения аватара
formChangeAvatar.addEventListener('submit', function (evt) {
    evt.preventDefault();
    changeAvatar();
    evt.target.reset();
});

//добавляем обработчик события кнопке смены аватара
changeAvatarButton.addEventListener('click', () => {
    openPopup(popupChangeAvatar);
});

const profilePhoto = document.querySelector('.profile__photo');
const linkAvatarInput = document.querySelector('.popup__item_avatar-link');
// const linkAvatarInput = document.forms["form-change-avatar"].elements["avatar-link"];
function changeAvatar() {
    // toggleButtonState(formChangeAvatar.querySelector(configForm.submitButtonSelector), true, configForm);
    // linkAvatarInput.validity.valid = true;
    profilePhoto.src = linkAvatarInput.value;
    // console.log(linkAvatarInput.validity);
    console.log(linkAvatarInput);
    closePopup(popupChangeAvatar);
}



// //Загрузка информации о пользователе с сервера
// fetch('https://nomoreparties.co/v1/wbf-cohort-15/users/me', {
//     headers: {
//         authorization: 'b4ee8ef2-41c2-427f-a7e5-ea90674cee2b'
//     }
// })
//     .then(res => res.json())
//     .then((result) => {
//     console.log(result);
//     }); 

// //обработчик подтверждения удаления
// formAcceptDelete.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     // deleteCard(evt);
//     console.log(evt);
//     closePopup(popupAcceptDelete);
// });