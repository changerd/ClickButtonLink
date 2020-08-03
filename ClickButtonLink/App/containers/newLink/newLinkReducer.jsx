import {
    ADD_LINK_START,
    ADD_LINK_SUCCESS,
    ADD_LINK_ERROR,
    GET_PROJECT_START,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_ERROR,    
} from './newLinkConstants.jsx'

const initialState = {
    project: { },   
    error: ''
}

export default function newLink(state = initialState, action) {
    switch (action.type) {
        case ADD_LINK_START:
            return { ...state, error: '' }

        case ADD_LINK_SUCCESS:
            window.history.back();
            return { ...state }

        case ADD_LINK_ERROR:
            return { ...state, error: action.payload }

        case GET_PROJECT_START:
            return { ...state, project: {}, error: '' }

        case GET_PROJECT_SUCCESS:
            return { ...state, project: action.payload, error: '' }

        case GET_PROJECT_ERROR:
            return { ...state, error: action.payload }       

        default:
            return state;
    }
}