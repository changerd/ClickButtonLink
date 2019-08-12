import {
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_ERROR,
    CHANGE_PROJECTNAME
} from './newProjectConstants.jsx'
import "isomorphic-fetch"

export function changeProjectName(text) {
    return {
        type: CHANGE_PROJECTNAME,
        payload: text
    }
}

export function addProject(projectName, historyObject) {
    return (dispatch) => {
        if (projectName) {
            fetch(constants.project, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectName: projectName })
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
            if(!projectName) {
                alert('Необходимо заполнить название новой записи');
                dispatch({ type: ADD_PROJECT_ERROR, payload: 'Необходимо заполнить название новой записи' });
            }
        }
    }
}
