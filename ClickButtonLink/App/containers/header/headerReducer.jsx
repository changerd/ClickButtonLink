import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,    
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from './headerConstants.jsx';
import AuthHelper from '../../Utils/authHelper.js';

const initialState = {
    isLogged: AuthHelper.isLogged(),
    name: AuthHelper.getLogin(),
    password: '',
    error: '',
}

export default function header(state = initialState, action) {
    switch (action.type) {
        case LOGIN_START:
            return { ...state, isLogged: false, name: '', name: '', password: '', error: '' }

        case LOGIN_SUCCESS:
            AuthHelper.saveAuth(action.payload.username, action.payload.access_token);                      
            return { ...state, isLogged: true, name: action.payload, password: '', error: '' }            

        case LOGIN_ERROR:
            alert('Auth error');
            return { ...state, error: action.payload }

        case LOGOUT:
            return { ...state, isLogged: false, name: '', password: '' }        

        case REGISTER_START:
            return { ...state, error: '' }

        case REGISTER_SUCCESS:
            alert(action.payload.message);
            if(action.payload.message == 'Registration completed') {                
                $('#registerModal').modal('toggle');
            }             
            return { ...state, error: '' }

        case REGISTER_ERROR:            
            return { ...state, error: action.payload }

        default:
            return state;
    }
}