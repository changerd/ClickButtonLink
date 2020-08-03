import "isomorphic-fetch";
import AuthHelper from '../utils/authHelpers.jsx';

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
            alert('Нужно авторизироваться');
            return next(action);
        }
    }

    fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(data)
    }).then((r) => {
        if (r.status == 200) {
            return r.json();
        }
    }).then((data) => {
        store.dispatch({
            type: successAction,
            payload: data
        });
    }, (error) => {
        alert(error);
        console.log(error);
        store.dispatch({
            type: failureAction,
            error
        });
    });
}

export default middleware;