import {
    EDIT_PROJECT_SUCCESS,
    EDIT_PROJECT_ERROR,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_ERROR,
    CHANGE_PROJECTNAME,
    CHANGE_PROJECTDESCRIPTION
} from './editProjectConstants.jsx'

const initialState = {
    project: null,
    projectName: '',
    projectDescription: '',
    error: ''
}

export default function editProject(state = initialState, action) {
    switch (action.type) {
        case EDIT_PROJECT_SUCCESS:
            return { ...state, projectName: '', projectDescription: '', error: '' }

        case EDIT_PROJECT_ERROR:
            return { ...state, error: action.payload }        

        case GET_PROJECT_SUCCESS:
            return { ...state, project: action.payload, error: '' }

        case GET_PROJECT_ERROR:
            return { ...state, error: action.payload }

        case CHANGE_PROJECTNAME:
            return { ...state, projectName: action.payload }

        case CHANGE_PROJECTDESCRIPTION:
            return { ...state, projectDescription: action.payload }

        default:
            return state;

    }
}