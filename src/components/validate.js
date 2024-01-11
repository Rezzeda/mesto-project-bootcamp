export function showError(inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass); //'popup__item_invalid'
    errorElement.textContent = inputElement.validationMessage;
}

export function hideError(inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass); //'popup__item_invalid'
    errorElement.textContent = inputElement.validationMessage;
}

export function checkInputValidity(inputElement, formElement, config) {
    const isInputValidity = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    // console.log(errorElement);
    if (isInputValidity) {
        hideError(inputElement, errorElement, config);
        // console.log(inputElement);
    } else {
        showError(inputElement, errorElement, config);
    }
};

export function toggleButtonState(popupButtonSubmit, isFormValid, config) {
    if (isFormValid) {
    popupButtonSubmit.removeAttribute('disabled');
    popupButtonSubmit.classList.remove(config.inactiveButtonClass);
    } else {
    popupButtonSubmit.setAttribute('disabled', true);
    popupButtonSubmit.classList.add(config.inactiveButtonClass); //popup__btn_disabled
    }
}

export function setEventListener (formElement, config) {
    const inputList = formElement.querySelectorAll(config.inputSelector); //.popup__item
    const popupButtonSubmit = formElement.querySelector(config.submitButtonSelector); //.popup__btn_action_submit
    toggleButtonState (popupButtonSubmit, formElement.checkValidity(), config);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                toggleButtonState (popupButtonSubmit, formElement.checkValidity(), config);
                checkInputValidity(inputElement, formElement, config);
            });
        });
};

export function enableValidation(config) {
    const formList = document.querySelectorAll(config.formSelector);//.popup__form
    formList.forEach(function (formElement) {
        setEventListener(formElement, config);
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            resetFormState(formElement, config);
        });
    });
}

export function resetFormState(formElement, config) {
    const inputList = formElement.querySelectorAll(config.inputSelector);

    inputList.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.remove(config.inputErrorClass);
        errorElement.textContent = '';
    });

    formElement.reset();
    toggleButtonState(formElement.querySelector(config.submitButtonSelector), false, config);
}
