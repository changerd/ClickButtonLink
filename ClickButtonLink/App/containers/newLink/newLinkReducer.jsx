import {
    ADD_LINK_SUCCESS,
    ADD_LINK_ERROR,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_ERROR,
    CHANGE_LINKNAME,
    CHANGE_LINKDESCRIPTION,
    CHANGE_LINKVALUE,
    CHANGE_LINKISACTIVE
} from './newLinkConstants.jsx'

const initialState = {
    project: { },   
    error: ''
}

export default function newLink(state = initialState, action) {
    switch (action.type) {
        case ADD_LINK_SUCCESS:
            return { ...state, linkName: '', linkDescription: '', linkValue: '', linkIsActive: false, error: '' }

        case ADD_LINK_ERROR:
            return { ...state, error: action.payload }

        case GET_PROJECT_SUCCESS:
            return { ...state, project: action.payload, error: '' }

        case GET_PROJECT_ERROR:
            return { ...state, error: action.payload }       

        default:
            return state;
    }
}