import {
    EDIT_LINK_SUCCESS,
    EDIT_LINK_ERROR,
    GET_LINK_SUCCESS,
    GET_LINK_ERROR,    
} from './editLinkConstants.jsx'

const initialState = {
    link: { },
    error: ''
}

export default function editLink(state = initialState, action) {
    switch (action.type) {
        case EDIT_LINK_SUCCESS:
            return { ...state, error: '' }

        case EDIT_LINK_ERROR:
            return { ...state, error: action.payload }

        case GET_LINK_SUCCESS:
            return { ...state, link: action.payload, error: '' }

        case GET_LINK_ERROR:
            return { ...state, error: action.payload }        

        default:
            return state;
    }
}