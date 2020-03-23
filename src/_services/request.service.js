import config from 'config';

export const requestService = {
    login,
    logout,
    register,
    getUserContacts,
    deleteUserContacts,
    updateUserContacts,
    addUserContacts
};

function login(username, password) {

    return fetch(`${config.apiUrl}/users?username=${username}`)
        .then(handleResponse)
        .then(user => {
            if (user[0].password != password) {
                logout();
                throw new Error();
            }
            localStorage.setItem('user', JSON.stringify(user[0]));
            return user[0];
        });
}

function register(newUser) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    };

    return fetch(`${config.apiUrl}/users`).then((res) => {
        res.text().then(text => {
            const users = text && JSON.parse(text);
            
            // validation
            let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
            if (duplicateUser) {
                return;
            }
        
            newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
            users.push(newUser);
            
            return fetch(`${config.apiUrl}/users`, requestOptions).
            then(() => {
                return newUser;
            });
        });
    });
}

function logout() {
    localStorage.removeItem('user');
}

// //////////////////////////////////////////////////////////

function getUserContacts(userid) {
    return fetch(`${config.apiUrl}/contacts?userId=${userid}`)
    .then(handleResponse)
}

function deleteUserContacts(id) {
    const requestActions = {
        method: "DELETE"
    };

    return fetch(`${config.apiUrl}/contacts/${id}`, requestActions)
    .then(handleResponse)
}

function updateUserContacts(data) {
    const requestActions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: data.name, phone: data.phone})
    };

    return fetch(`${config.apiUrl}/contacts/${data.id}` , requestActions)
    .then(handleResponse)
}

function addUserContacts(contact) {
    const requestActions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    };

    return fetch(`${config.apiUrl}/contacts`, requestActions)
    .then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
