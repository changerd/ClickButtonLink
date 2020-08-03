import {
    ADD_PROJECT_START,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_ERROR,
} from './newProjectConstants.jsx'

const initialState = {
    error: ''
}

export default function newProject(state = initialState, action) {
    switch (action.type) {        
        case ADD_PROJECT_START:
            return { ...state, error: '' }

        case ADD_PROJECT_SUCCESS:
            window.history.back();
            return { ...state }

        case ADD_PROJECT_ERROR:
            return { ...state, error: action.payload }

        default:
            return state;
    }
}