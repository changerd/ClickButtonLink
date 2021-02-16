import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,    
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from './headerConstants.jsx';
import AuthHelper from '../../utils/authHelpers.js';

const initialState = {
    isLogged: AuthHelper.isLogged(),
    username: AuthHelper.getLogin(),
    name: AuthHelper.getName(),
    password: '',
    error: '',
}

export default function header(state = initialState, action) {
    switch (action.type) {
        case LOGIN_START:
            return { ...state, isLogged: false, username: '', name: '', password: '', error: '' }

        case LOGIN_SUCCESS:            
            let log = false;
            if(action.payload) {
                AuthHelper.saveAuth(action.payload.username, action.payload.access_token, action.payload.name);
                log = true;
                window.location.replace('/');
            } else {                
                $('#logModal').modal('show');
                $('#logModalLabel').text('Вход'); 
                $('#logbody').text('Неверный логин или пароль'); 
            }                                  
            return { ...state, isLogged: log, username: action.payload, name: action.payload, password: '', error: '' }            

        case LOGIN_ERROR:
            $('#logModal').modal('show');
            $('#logModalLabel').text('Вход'); 
            $('#logbody').text('Ошибка авторизации'); 
            return { ...state, error: action.payload }

        case LOGOUT:
            return { ...state, isLogged: false, username: '', name: '', password: '' }        

        case REGISTER_START:
            return { ...state, error: '' }

        case REGISTER_SUCCESS:
            $('#logModal').modal('show');
            $('#logModalLabel').text('Регистрация'); 
            $('#logbody').text(action.payload.message);            
            if(action.payload.message == 'Регистрация завершена') {                
                $('#registerModal').modal('toggle');
            }             
            return { ...state, error: '' }

        case REGISTER_ERROR:            
            return { ...state, error: action.payload }

        default:
            return state;
    }
}