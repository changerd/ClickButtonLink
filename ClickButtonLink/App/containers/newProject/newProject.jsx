import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addProject, changeProjectName } from './newProjectActions.jsx'


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
                <input
                    type="button"
                    className="btn btn-primary"
                    value="Отправить"
                    onClick={() => this.props.addProject(this.props.projectName)}
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
        changeProjectName: bindActionCreators(changeProjectName, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(NewProject)