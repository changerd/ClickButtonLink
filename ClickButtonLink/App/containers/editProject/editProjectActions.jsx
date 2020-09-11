import {
    EDIT_PROJECT_START,
    EDIT_PROJECT_SUCCESS,
    EDIT_PROJECT_ERROR,
    GET_PROJECT_START,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_ERROR   
} from './editProjectConstants.jsx'
import "isomorphic-fetch"

export function getProject(projectId) {
    return {
        type: 'PROMISE',
        actions: [GET_PROJECT_START, GET_PROJECT_SUCCESS, GET_PROJECT_ERROR],
        url: constants.project + '?projectId=' + projectId,
        method: 'GET',
    }

    /*return (dispatch) => {
        fetch(window.constants.project + '?projectId=' + projectId)
            .then((response) => {
                return response.json();                
            }).then((data) => {
                dispatch({ type: GET_PROJECT_SUCCESS, payload: data });
            }).catch((ex) => {
                alert(ex);
                dispatch({ type: GET_PROJECT_ERROR, payload: ex });
            });
    }*/
}

export function editProject(projectId, projectName, projectDescription) {
    var editProjectData = {
        projectId: projectId, 
        projectName: projectName, 
        projectDescription: projectDescription
    }

    return {
        type: 'PROMISE',
        actions: [EDIT_PROJECT_START, EDIT_PROJECT_SUCCESS, EDIT_PROJECT_ERROR],
        url: constants.project + '?projectId=' + projectId,
        data: editProjectData,
    }

    /*return (dispatch) => {
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
                    window.history.back();
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
            } else if (!projectDescription) {
                alert('Необходимо заполнить описание проекта');
                dispatch({ type: EDIT_PROJECT_ERROR, payload: 'Необходимо заполнить описание новой записи' });
            }
        }
    }*/
}