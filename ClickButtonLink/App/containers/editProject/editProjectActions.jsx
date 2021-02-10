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
        method: 'PUT',
        data: editProjectData,
    }   
}