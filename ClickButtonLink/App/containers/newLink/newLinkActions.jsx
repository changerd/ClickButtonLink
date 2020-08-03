import {
    ADD_LINK_START,
    ADD_LINK_SUCCESS,
    ADD_LINK_ERROR,
    GET_PROJECT_START,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_ERROR   
} from './newLinkConstants.jsx'

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