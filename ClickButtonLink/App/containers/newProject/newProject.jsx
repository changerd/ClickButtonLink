import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addProject } from './newProjectActions.jsx'


class NewProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            projectDescription: '',
        }

        this.handleChange = this.handleChange.bind(this);        
    }

    handleChange(event) {
        const { id, value } = event.currentTarget;
        this.setState({ [id]: event.target.value })
    }    

    render() {       
        return (
            <div id="project">
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
                    onClick={() => this.props.addProject(this.state.projectName, this.state.projectDescription, this.props.history)}
                />
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