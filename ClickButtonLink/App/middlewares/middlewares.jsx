import "isomorphic-fetch";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import AuthHelper from '../utils/authHelpers.js';

const middleware = store => next => action => {
    if (action.type !== 'PROMISE') {
        return next(action);
    }

    const [startAction, successAction, failureAction] = action.actions;
    const { url, method, data } = action;

    store.dispatch({
        type: startAction
    });

    let headers = {
        'Content-Type': 'application/json; charset=utf-8'
    }

    if(!(url == constants.token || url == constants.register)) {
        let token = AuthHelper.getToken();
        headers['Authorization'] = 'Bearer ' + token;
        if(!token) {                      
            window.location.replace('/unauthorized');
            return next(action);
        }
    }
    
    console.log(url);
    
    fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(data)
    }).then((r) => {
        if (r.status == 200) { 
            console.log(r);           
            return r.json();
        } else if ((method == 'GET') && (r.status == 204)){
            window.location.replace('/*');            
        }
        
    }).then((data) => {
        store.dispatch({
            type: successAction,
            payload: data
        });
    }, (error) => {        
        console.log(error);
        console.log(url);
        store.dispatch({
            type: failureAction,
            error
        });
    });
}

export default middleware;