import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addProject, changeProjectName, changeProjectDescription } from './newProjectActions.jsx'


class NewProject extends React.Component {

    render() {
        return (
            <div id="project">
                <h3>Новый проект</h3>
                <div className="form-group">
                    <label>Название</label>
                    <input
                        type="input"
                        className="form-control"
                        value={this.props.data.projectName}
                        onChange={(e) => this.props.changeProjectName(e.target.value)}
                        placeholder="Введите название проекта"
                    />
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input
                        type="input"
                        className="form-control"
                        value={this.props.data.projectDescription}
                        onChange={(e) => this.props.changeProjectDescription(e.target.value)}
                        placeholder="Введите название проекта"
                    />
                </div>
                <input
                    type="button"
                    className="btn btn-primary"
                    value="Отправить"
                    onClick={() => this.props.addProject(this.props.data.projectName, this.props.data.projectDescription, this.props.history)}
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
        changeProjectName: bindActionCreators(changeProjectName, dispatch),
        changeProjectDescription: bindActionCreators(changeProjectDescription, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(NewProject)