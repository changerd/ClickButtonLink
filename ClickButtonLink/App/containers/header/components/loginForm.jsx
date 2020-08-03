import React from 'react';
import ReactDOM from 'react-dom';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            registerUsername: '',
            registerPassword: '',
            registerConfirmPassword: '',
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { id, value } = event.currentTarget;
        this.setState({ [id]: event.target.value })
    }

    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownLogin" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sign In
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownLogin">
                    <div className="px-4 py-3">
                        <div className="form-group">
                            <label>Login</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                placeholder="Enter login"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="Enter password" />
                        </div>
                        <input
                            type="button"
                            className="btn btn-dark"
                            value="Sign up"
                            onClick={() => this.props.onLogin(this.state.username, this.state.password)}
                        />
                    </div>
                    <div className="dropdown-divider"></div>
                    <button type="button"
                        className="dropdown-item btn btn-dark"
                        data-toggle="modal"
                        data-target="#registerModal">
                        New around here? Sign up
                    </button>
                </div>
                {/*Modal*/}
                <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog" aria-labelledby="registerModallLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 id="registerModalLabel">Register new user</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="registerUsername" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="registerUsername"
                                        value={this.state.registerUsername}
                                        onChange={this.handleChange}
                                        placeholder="Enter Username"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="registerPassword" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="registerPassword"
                                        value={this.state.registerPassword}
                                        onChange={this.handleChange}
                                        placeholder="Enter Password"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="registerConfirmPassword" className="form-label">Username</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="registerConfirmPassword"
                                        value={this.state.registerConfirmPassword}
                                        onChange={this.handleChange}
                                        placeholder="ConfirmPassword"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input
                                    type="button"
                                    value="Register"
                                    className="btn btn-dark"
                                    onClick={() => {
                                        if (this.state.registerPassword !== this.state.registerConfirmPassword) {
                                            alert('Password does not match');
                                        } else {
                                            this.props.onRegister(this.state.registerUsername, this.state.registerPassword, this.state.registerConfirmPassword);
                                            this.setState({
                                                registerUsername: '',
                                                registerPassword: '',
                                                registerConfirmPassword: '',
                                            });
                                        }
                                    }}
                                />
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};