import {
    EDIT_LINK_START,
    EDIT_LINK_SUCCESS,
    EDIT_LINK_ERROR,
    GET_LINK_START,
    GET_LINK_SUCCESS,
    GET_LINK_ERROR,    
} from './editLinkConstants.jsx'

const initialState = {
    link: { },
    error: ''
}

export default function editLink(state = initialState, action) {
    switch (action.type) {
        case EDIT_LINK_START:
            return { ...state, error: ''}

        case EDIT_LINK_SUCCESS:
            window.history.back();
            return { ...state, error: '' }

        case EDIT_LINK_ERROR:
            return { ...state, error: action.payload }

        case GET_LINK_START:
            return { ...state, link: {}, error: '' }

        case GET_LINK_SUCCESS:
            return { ...state, link: action.payload, error: '' }

        case GET_LINK_ERROR:
            return { ...state, error: action.payload }        

        default:
            return state;
    }
}