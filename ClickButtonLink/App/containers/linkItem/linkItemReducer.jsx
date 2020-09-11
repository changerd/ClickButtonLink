import {
    GET_LINK_START,
    GET_LINK_SUCCESS,
    GET_LINK_ERROR,
    DELETE_LINK_START,
    DELETE_LINK_SUCCESS,
    DELETE_LINK_ERROR
} from './linkItemConstants.jsx'

const initialState = {
    link: { },
    error: ''
}

export default function linkItem(state = initialState, action) {
    switch (action.type) {
        case GET_LINK_START:
            return { ...state, link: {}, error: '' }

        case GET_LINK_SUCCESS:
            return { ...state, link: action.payload, error: '' }

        case GET_LINK_ERROR:
            return { ...state, error: action.payload }

        case DELETE_LINK_START:
            return { ...state, error: '' }

        case DELETE_LINK_SUCCESS:
            window.history.back();
            return { ...state }

        case DELETE_LINK_ERROR:
            return { ...state, error: action.payload }

        default:
            return state;
    }
}