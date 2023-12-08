// popup Редактирование профиля
const editProfileButton = document.querySelector('.profile__btn_action_edit-profile');
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddImage = document.querySelector('.popup_type_add-image');
const nameInput = document.querySelector('.popup__item_name');
const descriptionInput = document.querySelector('.popup__item_description');

const submitButton = document.querySelector('.popup__btn_action_submit');
const formElement = document.querySelector('.popup__form');

// кнопка закрытия popup
const closeButtons = document.querySelectorAll('.popup__btn_action_close');

//popup добавление карточек
const addCardButton = document.querySelector('.profile__btn_action_add-photos');
const placeNameInput = document.querySelector('.profile__place_name');
const itemLinkInput = document.querySelector('.profile__item_link');

//Открытие модльного окна
function openPopup (item) {
    item.classList.add('popup_opened');
}

// добавляем обработчик события кнопке редактирования профиля для открытия модального окна c заполнением данных из профиля
editProfileButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    // Заполняем поля формы текущими значениями
    const currentName = document.querySelector('.profile__name').textContent;
    const currentDescription = document.querySelector('.profile__decription').textContent;
    // Устанавливаем значения в поля формы
    nameInput.value = currentName;
    descriptionInput.value = currentDescription;
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
    // Получаем значения из полей формы
    const newName = nameInput.value;
    const newDescription = descriptionInput.value;
    // Обновляем значения на странице
    document.querySelector('.profile__name').textContent = newName;
    document.querySelector('.profile__decription').textContent = newDescription;
    // Закрываем модальное окно
    closePopup(popupEditProfile);
}

// Находим кнопку "Сохранить" и добавляем обработчик события для сохранения изменений
submitButton.addEventListener('click', editProfile);

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
    // Вызываем функцию обновления профиля
    editProfile();
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

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

const templateCard = document.querySelector('#card-template').content.querySelector('.card');
const listGalleryCards = document.querySelector('.gallery__cards');

//функция создания карточки
function createCard (dataCard) {
    const galleryCard = templateCard.cloneNode(true);
    const cardElementTitle = galleryCard.querySelector('.card__title');
    const cardElementImage = galleryCard.querySelector('.card__image');
    const cardElementTrashButton = galleryCard.querySelector('.card__btn_trash')
    const cardElementLikeButton = galleryCard.querySelector('.card__btn');
    cardElementTitle.textContent = dataCard.name;
    cardElementImage.src = dataCard.link;
    cardElementTrashButton.addEventListener('click', deleteCard);
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
