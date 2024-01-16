import '../pages/index.css';
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
    popups,
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

// Функция обновления профиля введенными даннными
function editProfile(evt) {
    const dataProfile = {name: newName.textContent, about: newDescription.textContent};
    evt.submitter.textContent = 'Сохранение...';
    changeProfileInfo(dataProfile)
        .then(() => {
            newName.textContent = nameInput.value;
            newDescription.textContent = descriptionInput.value;
            formEditProfile.reset();
            closePopup(popupEditProfile);
        })
        .catch((error) => {
            console.error(`Ошибка при изменении профиля: ${error}`);
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        });
}

//Функция сохранения внесенных в формы popup изменений при рекдактиронии профиля
formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    editProfile(evt);
}); 

//Функция открытия просмотра изображения карточки
export function viewCardPhoto(dataCard) {
    openPopup(popupViewPhoto);
    popupPhoto.src = dataCard.link;
    popupPhoto.alt = dataCard.name;
    popupPhotoCaption.textContent = dataCard.name;
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
    evt.submitter.textContent = 'Создание...';
    addUserCard(newCardData)
        .then(response => {
            renderCard(response);
            // resetFormState(formAddImage, configForm);
            formAddImage.reset();
            closePopup(popupAddImage);
            // resetFormState(formAddImage, configForm);
        })
        .catch((error) => {
            console.error(`Ошибка при создании карточки: ${error}`); 
        })
        .finally(() => {
            evt.submitter.textContent = 'Создать';
        });
};

formAddImage.addEventListener('submit', (evt) => {
    evt.preventDefault();
    addCardFromPopup(evt);
    // evt.target.reset();
});

// Закрытие всех Popup при нажатии на Overlay
popups.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup')) {
            closePopup(evt.target);
        }
    });
});

//добавляем обработчик события кнопке смены аватара
changeAvatarButton.addEventListener('click', () => {
    openPopup(popupChangeAvatar);
});

//функция смены аватара
function changeAvatar(evt) {
    const dataProfileAvatar = {avatar: profilePhoto.src};
    evt.submitter.textContent = 'Сохранение...';
    changeUserAvatar(dataProfileAvatar)
        .then(() => {
            profilePhoto.src = linkAvatarInput.value;
            closePopup(popupChangeAvatar);
            formChangeAvatar.reset();
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
});

//загрузки всех данных, и пользователя и карточек.
Promise.all([getUserInfo(), getInitialCards()]) 
.then(([info, initialCards])=>{
    newName.textContent = info.name;
    newDescription.textContent = info.about;
    profilePhoto.src = info.avatar;
    myId = info._id;
    initialCards.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); //добавляем карточки с сервера по дате создания, сначала последние
    initialCards.forEach(card => renderCard(card));
}) 
.catch((error)=>{console.error(`Ошибка при выгрузке с сервера: ${error}`);
}) 

//вкл валидацию
enableValidation(configForm);


