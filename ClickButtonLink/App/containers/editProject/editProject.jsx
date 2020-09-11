import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { editProject, getProject } from './editProjectActions.jsx';

class EditProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            projectDescription: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { id, value } = event.currentTarget;
        this.setState({ [id]: event.target.value })
    }

    componentDidMount() {
        this.getProject();
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
                    />
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
                    type="button"
                    className="btn btn-primary"
                    value="Отправить"
                    onClick={() => {
                        if (!this.state.projectName) {
                            alert('Необходимо заполнить название проекта');
                        } else if (!this.state.projectDescription) {
                            alert('Необходимо заполнить описание проекта');
                        } else {
                            this.props.editProject(
                                this.props.data.project.projectId,
                                this.state.projectName,
                                this.state.projectDescription
                            );
                        }
                    }
                }
                />
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