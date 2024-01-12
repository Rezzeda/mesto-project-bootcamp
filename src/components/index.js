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
    profilePhoto,
    linkAvatarInput,
    } from './constants.js'
import { enableValidation, resetFormState,toggleButtonState } from './validate.js'
import { openPopup, closePopup } from './modal.js'
import { createCard, deleteCard } from './card.js'
import { getUserInfo, changeUserAvatar, changeProfileInfo, getInitialCards, addUserCard } from './api.js'

// добавляем обработчик события кнопке редактирования профиля для открытия модального окна c заполнением данных из профиля
editProfileButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    nameInput.value = newName.textContent;
    descriptionInput.value = newDescription.textContent;
});

function getInitialProfileInfo() {
    getUserInfo()
        .then(response => {
            newName.textContent = response.name;
            newDescription.textContent = response.about;
            profilePhoto.src = response.avatar;
            //renderInitialCards(response._id);
    }).catch((error) => {
        console.log(error);
    })
}

// //получаем свой пользовательский id



// Функция обновления профиля введенными даннными
function editProfile() {
    newName.textContent = nameInput.value;
    newDescription.textContent = descriptionInput.value;
    closePopup(popupEditProfile);
    const dataProfile = {name: newName.textContent, about: newDescription.textContent};
    changeProfileInfo(dataProfile);
    resetFormState(formEditProfile, configForm);
}

//Функция открытия просмотра изображения карточки
export function viewCardPhoto(evt) {
    openPopup(popupViewPhoto);
    popupPhoto.src = evt.target.closest('.card__image').src;
    popupPhoto.alt = evt.target.closest('.card__image').alt;
    // // popupPhotoCaption.textContent = evt.target.closest('.card').textContent;
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

// //функция добавления карточек из массива
// initialCards.forEach((dataCard) => {
//     listGalleryCards.append(createCard(dataCard));
// });

//добавляем карточки с сервера
function addInitialCards () {
    getInitialCards()
        .then(cards => {
            // console.log(cards);
            // cards.forEach((card) => console.log(card.name));
            cards.forEach((card) => {
                const newCardData = {
                    name: card.name,
                    link: card.link,
                    likes: card.likes,
                    owner: card.owner,
                }
                const newCard = createCard(newCardData);
                listGalleryCards.prepend(newCard);
            })
        })
}
addInitialCards ();

// функция создания карточки из введенных данных
function addCardFromPopup() {
    const newCardData = {
        name: placeNameInput.value,
        link: itemLinkInput.value,
    }
    const newCard = createCard(newCardData);
    listGalleryCards.prepend(newCard);
    addUserCard(newCardData);
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

//добавляем обработчик события кнопке смены аватара
changeAvatarButton.addEventListener('click', () => {
    openPopup(popupChangeAvatar);
});

function changeAvatar() {
    profilePhoto.src = linkAvatarInput.value;
    const dataProfileAvatar = {avatar: profilePhoto.src};
    changeUserAvatar(dataProfileAvatar);
    closePopup(popupChangeAvatar);
}

//Добавляем обработчик события для формы изменения аватара
formChangeAvatar.addEventListener('submit', function (evt) {
    evt.preventDefault();
    changeAvatar();
    evt.target.reset();
});

getInitialProfileInfo();

//вкл валидацию
enableValidation(configForm);


