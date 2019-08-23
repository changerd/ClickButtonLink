import {
    GET_LINK_SUCCESS,
    GET_LINK_ERROR,
    DELETE_LINK_SUCCESS,
    DELETE_LINK_ERROR
} from './linkItemConstants.jsx'

const initialState = {
    link: { },
    error: ''
}

export default function linkItem(state = initialState, action) {
    switch (action.type) {
        case GET_LINK_SUCCESS:
            return { ...state, link: action.payload, error: '' }

        case GET_LINK_ERROR:
            return { ...state, error: action.payload }

        case DELETE_LINK_SUCCESS:
            return { ...state }

        case DELETE_LINK_ERROR:
            return { ...state, error: action.payload }

        default:
            return state;
    }
}