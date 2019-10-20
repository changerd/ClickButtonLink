import {
    EDIT_LINK_SUCCESS,
    EDIT_LINK_ERROR,
    GET_LINK_SUCCESS,
    GET_LINK_ERROR,
    CHANGE_LINKNAME,
    CHANGE_LINKDESCRIPTION,
    CHANGE_LINKVALUE,
    CHANGE_LINKISACTIVE
} from './editLinkConstants.jsx'

const initialState = {
    link: { },
    error: ''
}

export default function editLink(state = initialState, action) {
    switch (action.type) {
        case EDIT_LINK_SUCCESS:
            return { ...state, error: '' }

        case EDIT_LINK_ERROR:
            return { ...state, error: action.payload }

        case GET_LINK_SUCCESS:
            return { ...state, link: action.payload, error: '' }

        case GET_LINK_ERROR:
            return { ...state, error: action.payload }

        case CHANGE_LINKNAME:
            return {
                ...state, link: {
                    ...state.link,
                    linkName: action.payload
                }
            }

        case CHANGE_LINKDESCRIPTION:
            return {
                ...state, link: {
                    ...state.link,
                    linkDescription: action.payload
                }
            }

        case CHANGE_LINKVALUE:
            return {
                ...state, link: {
                    ...state.link,
                    linkValue: action.payload
                }
            }

        case CHANGE_LINKISACTIVE:
            return {
                ...state, link: {
                    ...state.link,
                    linkIsActive: action.payload
                }
            }

        default:
            return state;
    }
}