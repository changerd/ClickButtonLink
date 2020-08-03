import {
    GET_PROJECTS_START,
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_ERROR,
    DELETE_PROJECT_START,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_ERROR
} from './projectsConstants.jsx'

const initialState = {
    data: {
        currentPage: 0,
        totalPages: 0,
        pageSizes: 0,
        countRecords: 0,
        records: []
    },
    error: '',
}

export default function projects(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS_START:
            return { ...state, data: { currentPage: 0, totalPages: 0, pageSizes: 0, countRecords: 0, records: [] }, error: '' }
        case GET_PROJECTS_SUCCESS:
            return { ...state, data: action.payload, error: '' }

        case GET_PROJECTS_ERROR:
            return { ...state, error: action.payload }

        case DELETE_PROJECT_START:
            return { ...state, error: '' }

        case DELETE_PROJECT_SUCCESS:
            return { ...state }

        case DELETE_PROJECT_ERROR:
            return { ...state, error: action.payload }

        default:
            return state;
    }
}