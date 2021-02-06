import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { editProject, getProject } from './editProjectActions.jsx';
import ValidationForm from '../../utils/validationForm.js'

class EditProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            projectDescription: ""
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
            this.props.editProject(
                this.props.data.project.projectId,
                this.state.projectName,
                this.state.projectDescription
            );
        }
        event.preventDefault();
    }

    componentDidMount() {
        this.getProject();
        ValidationForm.validateForm();
    }

    componentWillReceiveProps() {
        if (this.state.query !== location.search) {
            this.setState({
                query: location.search,
            })
            this.getProject();
        }

        this.setState({
            projectName: this.props.data.project.projectName,
            projectDescription: this.props.data.project.projectDescription,
        })
    }

    getProject() {
        const parsed = queryString.parse(location.search);
        if (parsed) {
            this.props.getProject(parsed['projectId']);
        }
    }

    /*componentDidUpdate(prevProps) {
        if (this.props.data.project.projectName !== prevProps.data.project.projectName) {
            this.setState({
                projectName: this.props.data.project.projectName                
            });
        }
        if (this.props.data.project.projectDescription !== prevProps.data.project.projectDescription) {
            this.setState({                
                projectDescription: this.props.data.project.projectDescription
            });
        }
    }*/

    render() {
        return (
            <div id="editProject">
                <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
                    <h3>Редактирование проекта</h3>
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
}

let mapProps = (state) => {
    return {
        data: state.editProject
    }
}

let mapDispatch = (dispatch) => {
    return {
        editProject: bindActionCreators(editProject, dispatch),
        getProject: bindActionCreators(getProject, dispatch),
    }
}

export default connect(mapProps, mapDispatch)(EditProject)