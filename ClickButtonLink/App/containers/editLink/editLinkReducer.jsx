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
    linkName: '',
    linkDescription: '',
    linkValue: '',
    linkIsActive: false,
    error: ''
}

export default function editLink(state = initialState, action) {
    switch (action.type) {
        case EDIT_LINK_SUCCESS:
            return { ...state, linkName: '', linkDescription: '', linkValue: '', linkIsActive: false, error: '' }

        case EDIT_LINK_ERROR:
            return { ...state, error: action.payload }

        case GET_LINK_SUCCESS:
            return { ...state, link: action.payload, error: '' }

        case GET_LINK_ERROR:
            return { ...state, error: action.payload }

        case CHANGE_LINKNAME:
            return { ...state, linkName: action.payload }

        case CHANGE_LINKDESCRIPTION:
            return { ...state, linkDescription: action.payload }

        case CHANGE_LINKVALUE:
            return { ...state, linkValue: action.payload }

        case CHANGE_LINKISACTIVE:
            return { ...state, linkIsActive: action.payload }

        default:
            return state;
    }
}