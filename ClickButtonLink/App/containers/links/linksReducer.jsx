import {
    GET_LINKS_START,
    GET_LINKS_SUCCESS,
    GET_LINKS_ERROR    
} from './linksConstants.jsx'

const initialState = {
    data: {
        currentPage: 0,
        totalPages: 0,
        pageSize: 0,
        countLinks: 0,
        projectId: 0,
        projectName: '',
        projectDescription: '',
        records: []
    },
    error: ''
}

export default function links(state = initialState, action) {
    switch (action.type) {
        case GET_LINKS_START:
            return { ...state, data: {}, error: '' }
                    
        case GET_LINKS_SUCCESS:
            return { ...state, data: action.payload, error: '' }

        case GET_LINKS_ERROR:
            return { ...state, error: action.payload }        

        default:
            return state;
    }
}