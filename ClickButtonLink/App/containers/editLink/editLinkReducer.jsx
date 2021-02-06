import {
    EDIT_LINK_START,
    EDIT_LINK_SUCCESS,
    EDIT_LINK_ERROR,
    GET_LINK_START,
    GET_LINK_SUCCESS,
    GET_LINK_ERROR,
    GET_PROJECTSLIST_START,
    GET_PROJECTSLIST_SUCCESS,
    GET_PROJECTSLIST_ERROR
} from './editLinkConstants.jsx'

const initialState = {
    link: {},
    projectsList: [],
    error: ''
}

export default function editLink(state = initialState, action) {
    switch (action.type) {
        case EDIT_LINK_START:
            return { ...state, error: '' }

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

        case GET_PROJECTSLIST_START:
            return { ...state, projectsList: [], error: '' }

        case GET_PROJECTSLIST_SUCCESS:
            return { ...state, projectsList: action.payload, error: '' }

        case GET_PROJECTSLIST_ERROR:
            return { ...state, error: action.payload }

        default:
            return state;
    }
}