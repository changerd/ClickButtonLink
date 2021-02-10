import { GET_LINKS_ERROR } from '../links/linksConstants.jsx'

export {
    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    CHANGE_PASSWORD_START,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR
} from './userConstants.jsx'

export function getUser() {
    return {
        type: 'PROMISE',
        actions: [GET_USER_START, GET_USER_SUCCESS, GET_LINKS_ERROR],
        method: 'GET',
        url: constants.user,
    }
}

export function changePassword(oldPassword, newPassword) {
    var changePasswordData = {
        oldPassword: oldPassword,
        newPassword: newPassword,
    }

    return {
        type: 'PROMISE',
        actions: [CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR],
        url: constants.user,
        method: 'PUT',
        data: changePasswordData,
    }
}