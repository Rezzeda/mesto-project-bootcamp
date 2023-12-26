import {
    popupEditProfile,
    nameInput,
    descriptionInput,
    newName,
    newDescription,
    popupViewPhoto,
    popupPhoto,
    popupPhotoCaption } from './constants.js'

//Открытие модального окна
export function openPopup (item) {
    item.classList.add('popup_opened');
}

// Функция закрытия модального окна
export function closePopup(item) {
    item.classList.remove('popup_opened');
}

// Функция обновления профиля введенными даннными
export function editProfile() {
    newName.textContent = nameInput.value;
    newDescription.textContent = descriptionInput.value;
    closePopup(popupEditProfile);
}

//Функция открытия просмотра изображения карточки
export function viewCardPhoto(evt) {
    openPopup(popupViewPhoto);
    popupPhoto.src = evt.target.closest('.card__image').src;
    popupPhoto.alt = evt.target.closest('.card__image').alt;
    popupPhotoCaption.textContent = evt.target.closest('.card').textContent;
};