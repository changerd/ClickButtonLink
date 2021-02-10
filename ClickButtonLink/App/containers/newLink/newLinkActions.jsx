import {
    ADD_LINK_START,
    ADD_LINK_SUCCESS,
    ADD_LINK_ERROR,
    GET_PROJECT_START,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_ERROR,
    GET_PROJECTSLIST_START,
    GET_PROJECTSLIST_SUCCESS,
    GET_PROJECTSLIST_ERROR   
} from './newLinkConstants.jsx'

export function getProject(projectId) {
    return {
        type: 'PROMISE',
        actions: [GET_PROJECT_START, GET_PROJECT_SUCCESS, GET_PROJECT_ERROR],
        url: window.constants.project + '?projectId=' + projectId,
        method: 'GET',
    };
}

export function getProjectsList() {
    return {
        type: 'PROMISE',
        actions: [GET_PROJECTSLIST_START, GET_PROJECTSLIST_SUCCESS, GET_PROJECTSLIST_ERROR],
        url: constants.projectslist,
        method: 'GET',
    };
}

export function addLink(projectId, linkName, linkDescription, linkValue, linkIsActive) {
    var addLinkData = {
        projectId: projectId, 
        linkName: linkName, 
        linkDescription: linkDescription, 
        linkValue: linkValue, 
        linkIsActive: linkIsActive
    }

    return {
        type: 'PROMISE',
        actions: [ADD_LINK_START, ADD_LINK_SUCCESS, ADD_LINK_ERROR],
        url: constants.link,
        method: 'POST',
        data: addLinkData,
    }   
}