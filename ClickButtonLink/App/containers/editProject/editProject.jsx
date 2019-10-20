import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { editProject, getProject, changeProjectName, changeProjectDescription } from './editProjectActions.jsx';

class EditProject extends React.Component {
    constructor(props) {
        super(props);        
    }
    
    componentDidMount() {
        const parsed = queryString.parse(location.search);
        if (parsed) {
            this.props.getProject(parsed['projectId']);            
        }
    }    
        
    render() {             
        return (
            <div id="editProject">
                <h3>Редактирование проекта</h3>
                <div className="form-group">
                    <label>Название</label>
                    <input
                        type="input"
                        className="form-control"
                        value={this.props.data.project.projectName}
                        onChange={(e) => this.props.changeProjectName(e.target.value)}
                        placeholder="Введите название проекта"
                    />
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input
                        type="input"
                        className="form-control"
                        value={this.props.data.project.projectDescription}
                        onChange={(e) => this.props.changeProjectDescription(e.target.value)}
                        placeholder="Введите описание проекта"
                    />
                </div>
                <input
                    type="button"
                    className="btn btn-primary"
                    value="Отправить"
                    onClick={() => this.props.editProject(
                        this.props.data.project.projectId,
                        this.props.data.project.projectName,
                        this.props.data.project.projectDescription                        
                    )}
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
        changeProjectName: bindActionCreators(changeProjectName, dispatch),
        changeProjectDescription: bindActionCreators(changeProjectDescription, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(EditProject)