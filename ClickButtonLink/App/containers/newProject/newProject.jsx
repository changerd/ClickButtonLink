import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addProject } from './newProjectActions.jsx'
import ValidationForm from '../../utils/validationForm.js'


class NewProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            projectDescription: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { id, value } = event.currentTarget;
        this.setState({ [id]: event.target.value })
    }

    handleSubmit(event) {
        if (this.state.projectName) {
            this.props.addProject(this.state.projectName, this.state.projectDescription);
        }
        event.preventDefault();
    }

    componentDidMount() {
        ValidationForm.validateForm();
    }

    render() {
        return (
            <div id="project">
                <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
                    <h3>Новый проект</h3>
                    <div className="form-group">
                        <label>Название</label>
                        <input
                            type="input"
                            id="projectName"
                            className="form-control"
                            value={this.state.projectName}
                            onChange={this.handleChange}
                            placeholder="Введите название проекта"
                            required
                        />
                        <div className="invalid-feedback">
                           Название проекта не должно быть пустым.
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Описание</label>
                        <input
                            type="input"
                            id="projectDescription"
                            className="form-control"
                            value={this.state.projectDescription}
                            onChange={this.handleChange}
                            placeholder="Введите описание проекта"
                        />
                    </div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Отправить"
                    />
                </form>

            </div>
        );
    }
};

let mapProps = (state) => {
    return {
        data: state.newProject
    }
}

let mapDispatch = (dispatch) => {
    return {
        addProject: bindActionCreators(addProject, dispatch),
    }
}

export default connect(mapProps, mapDispatch)(NewProject)