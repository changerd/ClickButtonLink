﻿import {
    GET_LINK_SUCCESS,
    GET_LINK_ERROR,
    DELETE_LINK_SUCCESS,
    DELETE_LINK_ERROR
} from './linkItemConstants.jsx'
import "isomorphic-fetch"

export function getLink(linkId) {
    return (dispatch) => {
        fetch(window.constants.linkdetails + '?linkId=' + linkId)
            .then((response) => {
                return response.json();
            }).then((data) => {
                dispatch({ type: GET_LINK_SUCCESS, payload: data });
            }).catch((ex) => {
                alert(ex);
                dispatch({ type: GET_LINK_ERROR, payload: ex });
            });
    }
}

export function deleteLink(linkId) {
    return (dispatch) => {
        fetch(window.constants.link + '?linkId=' + linkId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (response.ok) {
                dispatch({ type: DELETE_LINK_SUCCESS });
                window.history.back();
            } else {
                alert('Ошибка удаления ссылки');
                dispatch({ type: DELETE_LINK_ERROR, payload: 'Ошибка удаления ссылки' });
            }
        }).catch((ex) => {
            dispatch({ type: DELETE_LINK_ERROR, payload: ex });
        });
    }
}