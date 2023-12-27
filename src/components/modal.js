//Открытие модального окна
export function openPopup (item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscKey);
}

// Функция закрытия модального окна
export function closePopup(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscKey);
}

// Функция обработки события клавиатуры
function handleEscKey(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}