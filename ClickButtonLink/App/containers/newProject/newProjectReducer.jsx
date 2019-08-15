import {
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_ERROR,
    CHANGE_PROJECTNAME,
    CHANGE_PROJECTDESCRIPTION
} from './newProjectConstants.jsx'

const initialState = {
    projectName: '',
    projectDescription: '',
    error: ''
}

export default function newProject(state = initialState, action) {
    switch (action.type) {
        case ADD_PROJECT_SUCCESS:
            return { ...state, projectName: '', error: '' }

        case ADD_PROJECT_ERROR:
            return { ...state, error: action.payload }

        case CHANGE_PROJECTNAME:
            return { ...state, projectName: action.payload }

        case CHANGE_PROJECTDESCRIPTION:
            return { ...state, projectDescription: action.payload }

        default:
            return state;
    }
}