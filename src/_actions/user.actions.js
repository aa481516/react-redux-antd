import { userConstants } from '../_constants';
import { requestService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getUserContacts,
    deleteUserContacts,
    updateUserContacts,
    addUserContacts
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        requestService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    requestService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        requestService.register(user)
            .then(
                () => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getUserContacts(userId) {
    return dispatch => {
        dispatch(request());

        requestService.getUserContacts(userId)
            .then(
                contacts => dispatch(success(contacts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.USER_CONTACTS_REQUEST } }
    function success(contacts) { return { type: userConstants.USER_CONTACTS_SUCCESS, contacts } }
    function failure(error) { return { type: userConstants.USER_CONTACTS_FAILURE, error } }
}


function deleteUserContacts(contact) {
    return dispatch => {
        requestService.deleteUserContacts(contact.id)
            .then(
                () => dispatch(success(contact.id)),
                error => dispatch(failure(error.toString()))
            );
    };

    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(error) { return { type: userConstants.USER_CONTACTS_FAILURE, error } }
}



function updateUserContacts(data) {
    return dispatch => {
        requestService.updateUserContacts(data)
            .then(
                () => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function success(contacts) { return { type: userConstants.UPDATE_CONTACT_REQUEST_SUCCESS, contacts } }
    function failure(error) { return { type: userConstants.UPDATE_CONTACT_REQUEST_FAILURE, error } }
}



function addUserContacts(data) {
    return dispatch => {
        dispatch(request(data));
        
        requestService.addUserContacts(data)
            .then(
                () => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(data) { return { type: userConstants.ADD_CONTACT_REQUEST, data } }
    function success(contact) { return { type: userConstants.ADD_CONTACT_SUCCESS, contact } }
    function failure(error) { return { type: userConstants.ADD_CONTACT_FAILURE, error } }
}
