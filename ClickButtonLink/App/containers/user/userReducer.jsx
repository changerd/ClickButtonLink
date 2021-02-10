export {
    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    CHANGE_PASSWORD_START,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR
} from './userConstants.jsx'

const initialState = {
    user: {},
    error: ''
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case GET_USER_START:
            return { ...state, user: {}, error: '' }

        case GET_USER_SUCCESS:
            return { ...state, user: action.payload, error: '' }

        case GET_USER_ERROR:
            return { ...state, error: action.payload }

        case CHANGE_PASSWORD_START:
            return { ...state, error: '' }

        case CHANGE_PASSWORD_SUCCESS:
            return { ...state }

        case CHANGE_PASSWORD_ERROR:
            return { ...state, error: action.payload }

        default:
            return state;
    }
}