import {
    GET_LINK_START,
    GET_LINK_SUCCESS,
    GET_LINK_ERROR,
    DELETE_LINK_START,
    DELETE_LINK_SUCCESS,
    DELETE_LINK_ERROR
} from './linkItemConstants.jsx'
import "isomorphic-fetch"

export function getLink(linkId) {
    return {
        type: 'PROMISE',
        actions: [GET_LINK_START, GET_LINK_SUCCESS, GET_LINK_ERROR],
        url: constants.linkdetails + '?linkId=' + linkId,
        method: 'GET', 
    }  
}

export function deleteLink(linkId) {
    $('#deleteLinkModal').modal('toggle');
    return {
        type: 'PROMISE',
        actions: [DELETE_LINK_START, DELETE_LINK_SUCCESS, DELETE_LINK_ERROR],
        url: constants.link + '?linkId=' + linkId,
        method: 'DELETE',
    }      
}