import {
    ADD_PROJECT_START,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_ERROR
} from './newProjectConstants.jsx'
import "isomorphic-fetch"

export function addProject(projectName, projectDescription) {
    var addProjectData = { 
        projectName: projectName, 
        projectDescription: projectDescription 
    }

    return {
        type: 'PROMISE',
        actions: [ADD_PROJECT_START, ADD_PROJECT_SUCCESS, ADD_PROJECT_ERROR],
        url: constants.project,
        method: 'POST',
        data: addProjectData,
    };



    return (dispatch) => {
        if (projectName, projectDescription) {
            fetch(constants.project, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify()
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
