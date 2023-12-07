// Редактирование профиля
const editProfileButton = document.querySelector('.profile__btn_action_edit-profile');
const popup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__item_name');
const descriptionInput = document.querySelector('.popup__item_description');
const closeButton = document.querySelector('.popup__btn_action_close');
const saveButton = document.querySelector('.popup__btn_action_save');
const formElement = document.querySelector('.popup__form');

//Открытие модльного окна
function openPopup () {
    popup.classList.add('popup_opened');
    // Заполняем поля формы текущими значениями
    const currentName = document.querySelector('.profile__name').textContent;
    const currentDescription = document.querySelector('.profile__decription').textContent;
    // Устанавливаем значения в поля формы
    nameInput.value = currentName;
    descriptionInput.value = currentDescription;
}

// Функция закрытия модального окна
function closePopup() {
    popup.classList.remove('popup_opened');
}

// Функция обновления профиля
function editProfile() {
    // Получаем значения из полей формы
    const newName = nameInput.value;
    const newDescription = descriptionInput.value;

    // Обновляем значения на странице
    document.querySelector('.profile__name').textContent = newName;
    document.querySelector('.profile__decription').textContent = newDescription;

    // Закрываем модальное окно
    closePopup();
}

// добавляем обработчик события кнопке редактирования профиля для открытия модального окна
editProfileButton.addEventListener('click', openPopup);

// Находим кнопку закрытия и добавляем обработчик события для закрытия модального окна
closeButton.addEventListener('click', closePopup);

// Находим кнопку "Сохранить" и добавляем обработчик события для сохранения изменений
saveButton.addEventListener('click', editProfile);

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
    // Вызываем функцию обновления профиля
    editProfile();
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

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
