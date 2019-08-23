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
import "isomorphic-fetch"

export function changeLinkName(text) {
    return {
        type: CHANGE_LINKNAME,
        payload: text
    }
}

export function changeLinkDescription(text) {
    return {
        type: CHANGE_LINKDESCRIPTION,
        payload: text
    }
}

export function changeLinkValue(text) {
    return {
        type: CHANGE_LINKVALUE,
        payload: text
    }
}

export function changeLinkIsActive(check) {
    return {
        type: CHANGE_LINKISACTIVE,
        payload: check
    }
}

export function getLink(linkId) {
    return (dispatch) => {
        fetch(window.constants.link + '?linkId=' + linkId)
            .then((response) => {
                return response.json();
            }).then((data) => {
                dispatch({ type: GET_LINK_SUCCESS, payload: data });
            }).catch((ex) => {
                alert(ex);
                dispatch({ type: GET_LINK_ERROR, payload: ex });
            });
    }
}

export function editLink(linkId, projectId, linkName, linkDescription, linkValue, linkIsActive) {
    return (dispatch) => {
        if (linkId, projectId, linkName, linkDescription, linkValue) {
            fetch(constants.link, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ linkId: linkId, projectId: projectId, linkName: linkName, linkDescription: linkDescription, linkValue: linkValue, linkIsActive: linkIsActive })
            }).then((response) => {
                if (response.ok) {
                    dispatch({ type: EDIT_LINK_SUCCESS });
                    window.history.back();
                } else {
                    alert('Ошибка редактирования ссылки');
                    dispatch({ type: EDIT_LINK_ERROR, payload: 'Ошибка редактирования ссылки' });
                }
            }).catch((ex) => {
                alert(ex);
                dispatch({ type: EDIT_LINK_ERROR, payload: ex });
            });
        } else {
            if (!linkName) {
                alert('Необходимо заполнить название ссылки');
                dispatch({ type: EDIT_LINK_ERROR, payload: 'Необходимо заполнить название ссылки' });
            } else if (!linkDescription) {
                alert('Необходимо заполнить описание ссылки');
                dispatch({ type: EDIT_LINK_ERROR, payload: 'Необходимо заполнить описание ссылки' });
            } else if (!linkValue) {
                alert('Необходимо заполнить полную ссылку');
                dispatch({ type: EDIT_LINK_ERROR, payload: 'Необходимо заполнить полную ссылку' });
            }
        }
    }
}