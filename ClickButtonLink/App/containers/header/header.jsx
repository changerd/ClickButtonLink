﻿import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './components/loginForm.jsx'
import {
    login,
    logout,
    register,
} from './headerActions.jsx';
import AuthHelper from '../../utils/authHelpers.js';
import queryString, { parse } from "query-string";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: location.search }
    }

    componentDidMount() {
        this.vkLogin();
    }

    vkLogin() {
        let vkLogin, vkPassword;
        const parsed = queryString.parse(location.search)
        if (parsed) {
            vkLogin = parsed['vkLogin'];
            vkPassword = parsed['vkPassword'];

            if (vkLogin && vkPassword) {
                this.props.login(vkLogin, vkPassword.split("").reverse().join(""));
                <Redirect to="/" />
            }
        }
    }

    render() {
        let loginButton = this.props.header.isLogged ?
            <Link to="/user"><span className="nameLabel">Здравствуйте, {AuthHelper.getName()}</span></Link>
            :
            <LoginForm onLogin={this.props.login} onRegister={this.props.register} />

        let logoutButton = this.props.header.isLogged ?
            <button className="btn btn-dark" data-toggle="modal" data-target="#logoutModal">Выйти</button>
            :
            '';

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">ClickButtonLink</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/projects">Проекты</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/links">Ссылки</Link>
                        </li>
                    </ul>
                    <div className="navbar-text">
                        {loginButton} {logoutButton}

                        <div className="modal fade" id="logModal" tabIndex="-1" role="dialog" aria-labelledby="logModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="logModalLabel">Вход</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body" id="logbody"></div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal">Ок</button>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="logoutModalLabel">Выход</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Вы действительно хотите выйти?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                                        <button type="button" className="btn btn-primary" onClick={() => { this.props.logout(); $('#logoutModal').modal('toggle'); }}>Выйти</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
};

let mapProps = (state) => {
    return {
        header: state.header
    }
}

let mapDispatch = (dispatch) => {
    return {
        login: bindActionCreators(login, dispatch),
        logout: bindActionCreators(logout, dispatch),
        register: bindActionCreators(register, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(Header) 