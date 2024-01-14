import '../pages/index.css';
//import { initialCards } from './initial-cards.js'
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
    popupChangeAvatar,
    formChangeAvatar,
    changeAvatarButton,
    profilePhoto,
    linkAvatarInput,
    } from './constants.js'
import { enableValidation, resetFormState } from './validate.js'
import { openPopup, closePopup } from './modal.js'
import { createCard } from './card.js'
import { getUserInfo, changeUserAvatar, changeProfileInfo, getInitialCards, addUserCard } from './api.js'
export let myId = null;

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
            myId = response._id;
        })
        .catch((error) => {
            console.error(`Ошибка при загрузке профиля: ${error}`);
        })
}

// Функция обновления профиля введенными даннными
function editProfile(evt) {
    newName.textContent = nameInput.value;
    newDescription.textContent = descriptionInput.value;
    // closePopup(popupEditProfile);
    const dataProfile = {name: newName.textContent, about: newDescription.textContent};
    evt.submitter.textContent = 'Сохранение...';
    changeProfileInfo(dataProfile)
        .then(() => {
            closePopup(popupEditProfile);
        })
        .catch((error) => {
            console.error(`Ошибка при изменении профиля: ${error}`);
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        });
    resetFormState(formEditProfile, configForm);
}

//Функция сохранения внесенных в формы popup изменений при рекдактиронии профиля
formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    editProfile(evt);
    closePopup(popupEditProfile);
}); 

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

//добавляем обработчик события кнопке добавления карточки для открытия модального окна
addCardButton.addEventListener('click', () => {
    openPopup(popupAddImage);
});

// //функция добавления карточек из массива
// initialCards.forEach((dataCard) => {
//     listGalleryCards.append(createCard(dataCard));
// });

//добавляем карточки с сервера по дате создания, сначала последние
function addInitialCards () {
    getInitialCards()
        .then(cards => {
            // console.log(cards);
            // cards.forEach((card) => console.log(card));
            cards.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            cards.forEach(card => renderCard(card));
        })
        .catch((error) => {
            console.error(`Ошибка при загрузке карточек: ${error}`);
        })
}
addInitialCards ();

//отрисовка карточки
function renderCard(data) {
    const newCard = createCard(data);
    listGalleryCards.prepend(newCard);
}

// функция создания карточки из введенных данных
function addCardFromPopup(evt) {
    const newCardData = {
        name: placeNameInput.value,
        link: itemLinkInput.value,
    };
    evt.submitter.textContent = 'Сохранение...';
    addUserCard(newCardData)
        .then(response => {
            renderCard(response);
            closePopup(popupAddImage);
        })
        .catch((error) => {
            console.error(`Ошибка при сохранении карточки: ${error}`); 
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        });
};

formAddImage.addEventListener('submit', (evt) => {
    evt.preventDefault();
    addCardFromPopup(evt);
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

//функция смены аватара
function changeAvatar(evt) {
    profilePhoto.src = linkAvatarInput.value;
    const dataProfileAvatar = {avatar: profilePhoto.src};
    evt.submitter.textContent = 'Сохранение...';
    changeUserAvatar(dataProfileAvatar)
        .then(() => {
            closePopup(popupChangeAvatar);
        })
        .catch((error) => {
            console.error(`Ошибка при изменении аватара: ${error}`);
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        });
}

//Добавляем обработчик события для формы изменения аватара
formChangeAvatar.addEventListener('submit', function (evt) {
    evt.preventDefault();
    changeAvatar(evt);
    evt.target.reset();
});

getInitialProfileInfo();

//вкл валидацию
enableValidation(configForm);


