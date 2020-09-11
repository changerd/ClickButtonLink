import {
    EDIT_PROJECT_START,
    EDIT_PROJECT_SUCCESS,
    EDIT_PROJECT_ERROR,
    GET_PROJECT_START,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_ERROR    
} from './editProjectConstants.jsx'

const initialState = {
    project: { },    
    error: ''
}

export default function editProject(state = initialState, action) {
    switch (action.type) {
        case EDIT_PROJECT_START:
            return { ...state, error: '' }

        case EDIT_PROJECT_SUCCESS:
            window.history.back();
            return { ...state, error: '' }

        case EDIT_PROJECT_ERROR:
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