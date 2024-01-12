const configApi = {
    baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-15',
    headers: {
        authorization: 'b4ee8ef2-41c2-427f-a7e5-ea90674cee2b',
        'Content-Type': 'application/json'
    }
}

//Загрузка информации о пользователе с сервера
export const getUserInfo = () => {
    return fetch(`${configApi.baseUrl}/users/me`, {
        headers: configApi.headers
    })
    .then(res => res.json());
}

//Изменение информации профиля на сервере
export const changeProfileInfo = (dataProfile) => {
    return fetch(`${configApi.baseUrl}/users/me`, {
        method: "PATCH",
        headers: configApi.headers,
        body: JSON.stringify(dataProfile)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
    });
}

//Изменение аватара на сервере
export const changeUserAvatar = (dataProfileAvatar) => {
    return fetch(`${configApi.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: configApi.headers,
        body: JSON.stringify(dataProfileAvatar)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
    });
}

//Загрузка начальных карточек с сервера
export const getInitialCards = () => {
    return fetch(`${configApi.baseUrl}/cards`, {
        headers: configApi.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
}

//добавление карточки на сервер
export const addUserCard = (userCard) => {
    return fetch(`${configApi.baseUrl}/cards`, {
        method: "POST",
        headers: configApi.headers,
        body: JSON.stringify(userCard)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
    });
}

//добавление лайка на сервер
export const addLike = (cardId) => {
    return fetch(`${configApi.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: configApi.headers,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
    });
}

//Удаление лайка с сервера
export const removeLike = (cardId) => {
    return fetch(`${configApi.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: configApi.headers,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
    });
}