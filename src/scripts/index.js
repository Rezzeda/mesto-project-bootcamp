import '../pages/index.css';

// popup Редактирование профиля
const editProfileButton = document.querySelector('.profile__btn_action_edit-profile');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddImage = document.querySelector('.popup_type_add-image');
const nameInput = document.querySelector('.popup__item_name');
const descriptionInput = document.querySelector('.popup__item_description');
// const formEditProfile = document.querySelector('.popup__form_profile')
const formEditProfile = document.forms["form-edit-profile"];
const newName = document.querySelector('.profile__name');
const newDescription = document.querySelector('.profile__decription');

// кнопка закрытия popup
const closeButtons = document.querySelectorAll('.popup__btn_action_close');

//popup добавление карточек
const addCardButton = document.querySelector('.profile__btn_action_add-photos');
const placeNameInput = document.querySelector('.popup__item_place-name');
const itemLinkInput = document.querySelector('.popup__item_link');
const templateCard = document.querySelector('#card-template').content.querySelector('.card');
const listGalleryCards = document.querySelector('.gallery__cards');
const formAddImage = document.forms["form-add-image"];

//popup просмотра фото
const popupViewPhoto = document.querySelector('.popup_type_view-photo');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoCaption = document.querySelector('.popup__photo-caption');

//Открытие модльного окна
function openPopup (item) {
    item.classList.add('popup_opened');
}

// добавляем обработчик события кнопке редактирования профиля для открытия модального окна c заполнением данных из профиля
editProfileButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    nameInput.value = newName.textContent;
    descriptionInput.value = newDescription.textContent;
});

// Функция закрытия модального окна
function closePopup(item) {
    item.classList.remove('popup_opened');
}

// функция закрытия попапа по нажатию на крестик
closeButtons.forEach((item) => {
    item.addEventListener('click', (evt) => {
        const popupClosest = evt.target.closest('.popup');
        closePopup(popupClosest);
    });
});

// Функция обновления профиля введенными даннными
function editProfile() {
    newName.textContent = nameInput.value;
    newDescription.textContent = descriptionInput.value;
    closePopup(popupEditProfile);
}

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

// Добавление карточек «из коробки»
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//функция создания карточки
function createCard (dataCard) {
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

//функция добавления карточек из массива
initialCards.forEach((dataCard) => {
    listGalleryCards.append(createCard(dataCard));
});

//Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
};

//Функция "нравится"
function likeCard(evt) {
    evt.target.classList.toggle('card__btn_like-active')
}

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

//Функция открытия просмотра изображения карточки
function viewCardPhoto(evt) {
    openPopup(popupViewPhoto);
    popupPhoto.src = evt.target.closest('.card__image').src;
    popupPhoto.alt = evt.target.closest('.card__image').alt;
    popupPhotoCaption.textContent = evt.target.closest('.card').textContent;
};

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

function showError(inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass); //'popup__item_invalid'
    errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass); //'popup__item_invalid'
    errorElement.textContent = inputElement.validationMessage;
}

function checkInputValidity(inputElement, formElement, config) {
    const isInputValidity = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    console.log(errorElement);
    if (isInputValidity) {
        hideError(inputElement, errorElement, config);
    } else {
        showError(inputElement, errorElement, config);
    }
};

function toggleButtonState(popupButtonSubmit, isFormValid, config) {
    if (isFormValid) {
    popupButtonSubmit.removeAttribute('disabled');
    popupButtonSubmit.classList.remove(config.inactiveButtonClass); //popup__btn_disabled
    } else {
    popupButtonSubmit.setAttribute('disabled', true);
    popupButtonSubmit.classList.add(config.inactiveButtonClass); //popup__btn_disabled
    }
}

function setEventListener (formElement, config) {
    const inputList = formElement.querySelectorAll(config.inputSelector); //.popup__item
    const popupButtonSubmit = formElement.querySelector(config.submitButtonSelector); //.popup__btn_action_submit
    toggleButtonState (popupButtonSubmit, formElement.checkValidity(), config);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                toggleButtonState (popupButtonSubmit, formElement.checkValidity(), config);
                checkInputValidity(inputElement, formElement, config);
            });
        });

        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        });
};

function enableValidation(config) {
    const formList = document.querySelectorAll(config.formSelector);//.popup__form
    formList.forEach(function (formElement) {
        setEventListener(formElement, config)
        });
}

//Объект валидации
const configForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_disabled',
    inputErrorClass: 'popup__item_invalid',
}
enableValidation(configForm);