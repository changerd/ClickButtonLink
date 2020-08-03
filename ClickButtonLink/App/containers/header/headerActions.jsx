import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,    
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from './headerConstants.jsx';
import AuthHelper from '../../Utils/authHelper.js';

export function logout() {
    AuthHelper.clearAuth();
    return {
        type: LOGOUT
    }
}

export function login(userName, password) {
    var identityData = {
        'username': userName,
        'password': password
    }

    return {
        type: 'PROMISE',
        actions: [LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR],
        url: constants.token,
        method: 'POST',
        data: identityData
    };
}

export function register(userName, password, confirmPassword) {
    var registerData = {
        'username': userName,
        'password': password,
        'confirmPassword': confirmPassword
    }

    return {
        type: 'PROMISE',
        actions: [REGISTER_START, REGISTER_SUCCESS, REGISTER_ERROR],
        url: constants.register,
        method: 'POST',
        data: registerData
    };
}