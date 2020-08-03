import {
    GET_PROJECTS_START,
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_ERROR,
    DELETE_PROJECT_START,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_ERROR
} from './projectsConstants.jsx';

export function getProjects(pageIndex = 0) {
    let queryTrailer = '?pageIndex=' + pageIndex;
    return {
        type: 'PROMISE',
        actions: [GET_PROJECTS_START, GET_PROJECTS_SUCCESS, GET_PROJECTS_ERROR],
        url: window.constants.page + queryTrailer,
        method: 'GET',
    };
}

export function deleteProject(projectId) {
    return {
        type: 'PROMISE',
        actions: [DELETE_PROJECT_START, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_ERROR],
        url: window.constants.project + '?projectId=' + projectId,
        method: 'DELETE',
    };
}