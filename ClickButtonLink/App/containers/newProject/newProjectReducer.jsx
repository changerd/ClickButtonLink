import {
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_ERROR,
    CHANGE_PROJECTNAME
} from './newProjectConstants.jsx'

const initialState = {
    projectName: '',
    error: ''
}

export default function newPost(state = initialState, action) {
    switch (action.type) {
        case ADD_PROJECT_SUCCESS:
            return { ...state, projectName: '', error: '' }

        case ADD_PROJECT_ERROR:
            return { ...state, error: action.payload }

        case CHANGE_PROJECTNAME:
            return { ...state, projectName: action.payload }

        default:
            return state;
    }
}