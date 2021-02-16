import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser, changePassword } from './userActions.jsx'
import ValidationForm from '../../utils/validationForm.js'

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { id, value } = event.currentTarget;
        this.setState({ [id]: event.target.value })

        if ((this.state.newPassword !== event.target.value) && (id == 'newPasswordConfirm')) {
            $("#newPasswordConfirm").css("border-color", "#dc3545");
            $("#passwordsDoesntMatch").css("display", "block");
        } else {
            $("#newPasswordConfirm").css("border-color", "#ced4da");
            $("#passwordsDoesntMatch").css("display", "none");
        }
    }

    handleSubmit(event) {
        if ((this.state.newPassword == this.state.newPasswordConfirm) &&
            this.state.oldPassword &&
            this.state.newPassword &&
            this.state.newPasswordConfirm) {
            this.props.changePassword(this.state.oldPassword, this.state.newPassword);
            this.setState({
                oldPassword: '',
                newPassword: '',
                newPasswordConfirm: '',
            });
        }

        event.preventDefault();
    }

    componentDidMount() {
        this.props.getUser();
        ValidationForm.validateForm();
    }

    render() {
        return (
            <div id="user">
                <h1 align="center">Личный кабинет</h1>
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <dl className="dl-horizontal">

                            <dt>
                                Логин
                            </dt>

                            <dd>
                                {this.props.user.login}
                            </dd>

                            <dt>
                                Имя
                            </dt>

                            <dd>
                                {this.props.user.name}
                            </dd>
                        </dl>
                    </div>
                    <div className="col-md-6">
                        <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
                            <h3>Смена пароля</h3>
                            <div className="form-group">
                                <label>Старый пароль</label>
                                <input
                                    type="password"
                                    id="oldPassword"
                                    className="form-control"
                                    value={this.state.oldPassword}
                                    onChange={this.handleChange}
                                    placeholder="Введите старый пароль"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Введите старый пароль
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Новый пароль</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    className="form-control"
                                    value={this.state.newPassword}
                                    onChange={this.handleChange}
                                    placeholder="Введите новый пароль"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Введите новый пароль.
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Подтверждение нового пароля</label>
                                <input
                                    type="password"
                                    id="newPasswordConfirm"
                                    className="form-control"
                                    value={this.state.newPasswordConfirm}
                                    onChange={this.handleChange}
                                    placeholder="Подтвердите новый пароль"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Подтвердите новый пароль.
                                </div>
                                <div id="passwordsDoesntMatch" className="passwords-doesnt-match">
                                    Пароли не совпадают.
                                </div>
                            </div>
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value="Отправить"
                            />
                        </form>
                    </div>
                </div>
                <div className="modal fade" id="cpModal" tabIndex="-1" role="dialog" aria-labelledby="cpModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="cpModalLabel">Смена пароля</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" id="cpbody"></div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Ок</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        )
    }
}

let mapProps = (state) => {
    return {
        user: state.user.user
    }
}

let mapDispatch = (dispatch) => {
    return {
        getUser: bindActionCreators(getUser, dispatch),
        changePassword: bindActionCreators(changePassword, dispatch),
    }
}

export default connect(mapProps, mapDispatch)(User)