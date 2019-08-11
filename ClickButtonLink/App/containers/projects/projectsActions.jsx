import {
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_ERROR,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_ERROR,
} from './projectsConstants.jsx'

export function getProjects(pageIndex = 0) {
    return (dispatch) => {
        let queryTrailer = '?pageIndex=' + pageIndex;
        fetch(window.constants.page + queryTrailer)
            .then((response) => {
                return response.json();
            }).then((data) => {
                dispatch({ type: GET_PROJECTS_SUCCESS, payload: data });
            }).catch((ex) => {
                dispatch({ type: GET_PROJECTS_ERROR, payload: ex });
            });
    }
}

export function deleteProject(projectId, returnPageIndex) {
    return (dispatch) => {
        fetch(window.constants.project + '?projectId=' + projectId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'                
            }
        }).then((response) => {
            if (response.ok) {
                dispatch({ type: DELETE_PROJECT_SUCCESS });
                getPosts(returnPageIndex, returnTag)(dispatch);
            } else {
                alert('Ошибка удаления записи');
                dispatch({ type: DELETE_PROJECT_ERROR, payload: 'Ошибка удаления записи' });
            }
        }).catch((ex) => {
            dispatch({ type: DELETE_POST_ERROR, payload: ex });
        });
    }
}