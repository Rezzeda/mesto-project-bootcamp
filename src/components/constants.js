// popup Редактирование профиля
export const editProfileButton = document.querySelector('.profile__btn_action_edit-profile');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupAddImage = document.querySelector('.popup_type_add-image');
export const nameInput = document.querySelector('.popup__item_name');
export const descriptionInput = document.querySelector('.popup__item_description');
// const formEditProfile = document.querySelector('.popup__form_profile')
export const formEditProfile = document.forms["form-edit-profile"];
export const newName = document.querySelector('.profile__name');
export const newDescription = document.querySelector('.profile__decription');

// кнопка закрытия popup
export const closeButtons = document.querySelectorAll('.popup__btn_action_close');

//popup добавление карточек
export const addCardButton = document.querySelector('.profile__btn_action_add-photos');
export const placeNameInput = document.querySelector('.popup__item_place-name');
export const itemLinkInput = document.querySelector('.popup__item_link');
export const templateCard = document.querySelector('#card-template').content.querySelector('.card');
export const listGalleryCards = document.querySelector('.gallery__cards');
export const formAddImage = document.forms["form-add-image"];

//popup просмотра фото
export const popupViewPhoto = document.querySelector('.popup_type_view-photo');
export const popupPhoto = document.querySelector('.popup__photo');
export const popupPhotoCaption = document.querySelector('.popup__photo-caption');
