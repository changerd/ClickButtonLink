import {
    ADD_LINK_SUCCESS,
    ADD_LINK_ERROR,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_ERROR,
    CHANGE_LINKNAME,
    CHANGE_LINKDESCRIPTION,
    CHANGE_LINKVALUE,
    CHANGE_LINKISACTIVE
} from './newLinkConstants.jsx'
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

export function getProject(projectId) {
    return (dispatch) => {
        fetch(window.constants.project + '?projectId=' + projectId)
            .then((response) => {
                return response.json();
            }).then((data) => {
                dispatch({ type: GET_PROJECT_SUCCESS, payload: data });
            }).catch((ex) => {
                alert(ex);
                dispatch({ type: GET_PROJECT_ERROR, payload: ex });
            });
    }
}

export function addLink(projectId, linkName, linkDescription, linkValue, linkIsActive) {
    return (dispatch) => {
        if (projectId, linkName, linkDescription, linkValue) {
            fetch(constants.link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectId: projectId, linkName: linkName, linkDescription: linkDescription, linkValue: linkValue, linkIsActive: linkIsActive })
            }).then((response) => {
                if (response.ok) {
                    dispatch({ type: ADD_LINK_SUCCESS });
                    window.history.back();
                } else {
                    alert('Ошибка добавления ссылки');
                    dispatch({ type: ADD_LINK_ERROR, payload: 'Ошибка добавления ссылки' });
                }
            }).catch((ex) => {
                alert(ex);
                dispatch({ type: ADD_LINK_ERROR, payload: ex });
            });
        } else {
            if (!linkName) {
                alert('Необходимо заполнить название ссылки');
                dispatch({ type: ADD_LINK_ERROR, payload: 'Необходимо заполнить название ссылки' });
            } else if (!linkDescription) {
                alert('Необходимо заполнить описание ссылки');
                dispatch({ type: ADD_LINK_ERROR, payload: 'Необходимо заполнить описание ссылки' });
            } else if (!linkValue) {
                alert('Необходимо заполнить полную ссылку');
                dispatch({ type: ADD_LINK_ERROR, payload: 'Необходимо заполнить полную ссылку' });
            } 
        }
    }
}