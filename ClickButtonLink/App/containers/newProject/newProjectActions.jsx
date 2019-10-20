import {
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_ERROR
} from './newProjectConstants.jsx'
import "isomorphic-fetch"

export function addProject(projectName, projectDescription, historyObject) {
    return (dispatch) => {
        if (projectName, projectDescription) {
            fetch(constants.project, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectName: projectName, projectDescription: projectDescription })
            }).then((response) => {
                if (response.ok) {
                    dispatch({ type: ADD_PROJECT_SUCCESS });
                    historyObject.push('/');
                } else {
                    alert('Ошибка добавления записи');
                    dispatch({ type: ADD_PROJECT_ERROR, payload: 'Ошибка добавления записи' });
                }
            }).catch((ex) => {
                alert(ex);
                dispatch({ type: ADD_PROJECT_ERROR, payload: ex });
            });
        } else {
            if (!projectName) {
                alert('Необходимо заполнить название проекта');
                dispatch({ type: ADD_PROJECT_ERROR, payload: 'Необходимо заполнить название новой записи' });
            } else if (!projectDescription) {
                alert('Необходимо заполнить описание проекта');
                dispatch({ type: ADD_PROJECT_ERROR, payload: 'Необходимо заполнить название новой записи' });
            }
        }
    }
}
