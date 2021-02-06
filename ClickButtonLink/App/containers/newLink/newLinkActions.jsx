﻿import {
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

    /*return (dispatch) => {
        if (projectId, linkName, linkDescription, linkValue) {
            fetch(constants.link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectId: projectId, linkName: linkName, linkDescription: linkDescription, linkValue: linkValue, linkIsActive: linkIsActive })
            }).then((response) => {
                if (response.ok) {
                    dispatch({ type: ADD_LINK_SUCCESS });
                    window.history.back();
                } else {
                    alert('Ошибка добавления ссылки');
                    dispatch({ type: ADD_LINK_ERROR, payload: 'Ошибка добавления ссылки' });
                }
            }).catch((ex) => {
                alert(ex);
                dispatch({ type: ADD_LINK_ERROR, payload: ex });
            });
        } else {
            if (!linkName) {
                alert('Необходимо заполнить название ссылки');
                dispatch({ type: ADD_LINK_ERROR, payload: 'Необходимо заполнить название ссылки' });
            } else if (!linkDescription) {
                alert('Необходимо заполнить описание ссылки');
                dispatch({ type: ADD_LINK_ERROR, payload: 'Необходимо заполнить описание ссылки' });
            } else if (!linkValue) {
                alert('Необходимо заполнить полную ссылку');
                dispatch({ type: ADD_LINK_ERROR, payload: 'Необходимо заполнить полную ссылку' });
            } 
        }
    }*/
}