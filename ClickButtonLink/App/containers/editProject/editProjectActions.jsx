import {
    EDIT_PROJECT_SUCCESS,
    EDIT_PROJECT_ERROR,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_ERROR,
    CHANGE_PROJECTNAME,
    CHANGE_PROJECTDESCRIPTION
} from './editProjectConstants.jsx'
import "isomorphic-fetch"

export function changeProjectName(projectName) {
    return {
        type: CHANGE_PROJECTNAME,
        payload: projectName
    }
}

export function changeProjectDescription(projectDescription) {
    return {
        type: CHANGE_PROJECTDESCRIPTION,
        payload: projectDescription
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

export function editProject(projectId, projectName, projectDescription, historyObject) {
    return (dispatch) => {
        if (projectId, projectName, projectDescription) {
            fetch(window.constants.project + '?projectId=' + projectId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ projectId: projectId, projectName: projectName, projectDescription: projectDescription })
            }).then((response) => {
                if (response.ok) {
                    dispatch({ type: EDIT_PROJECT_SUCCESS });
                    historyObject.push('/');
                } else {
                    alert('Ошибка редактирования проекта');
                    dispatch({ type: EDIT_PROJECT_ERROR, payload: 'Ошибка редактирования проекта' });
                }
            }).catch((ex) => {
                alert(ex);
                dispatch({ type: EDIT_PROJECT_ERROR, payload: ex });
            });
        } else {
            if (!projectName) {
                alert('Необходимо заполнить название проекта');
                dispatch({ type: EDIT_PROJECT_ERROR, payload: 'Необходимо заполнить название новой записи' });
            }
            if (!projectDescription) {
                alert('Необходимо заполнить описание проекта');
                dispatch({ type: EDIT_PROJECT_ERROR, payload: 'Необходимо заполнить название новой записи' });
            }
        }
    }
}