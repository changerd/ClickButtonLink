import {
    EDIT_LINK_START,
    EDIT_LINK_SUCCESS,
    EDIT_LINK_ERROR,
    GET_LINK_START,
    GET_LINK_SUCCESS,    
    GET_LINK_ERROR, 
    GET_PROJECTSLIST_START,
    GET_PROJECTSLIST_SUCCESS,
    GET_PROJECTSLIST_ERROR  
} from './editLinkConstants.jsx'
import "isomorphic-fetch"

export function getLink(linkId) {
    return {
        type: 'PROMISE',
        actions: [GET_LINK_START, GET_LINK_SUCCESS, GET_LINK_ERROR],
        url: constants.link + '?linkId=' + linkId,
        method: 'GET',
    }   
}

export function editLink(linkId, projectId, linkName, linkDescription, linkValue, linkIsActive) {
    var editLinkData = {
        linkId: linkId, 
        projectId: projectId, 
        linkName: linkName, 
        linkDescription: linkDescription, 
        linkValue: linkValue, 
        linkIsActive: linkIsActive
    }
    
    return {
        type: 'PROMISE',
        actions: [EDIT_LINK_START, EDIT_LINK_SUCCESS, EDIT_LINK_ERROR],
        url: constants.link,
        method: 'PUT',
        data: editLinkData
    }   
}

export function getProjectsList() {
    return {
        type: 'PROMISE',
        actions: [GET_PROJECTSLIST_START, GET_PROJECTSLIST_SUCCESS, GET_PROJECTSLIST_ERROR],
        url: constants.projectslist,
        method: 'GET',
    };
}