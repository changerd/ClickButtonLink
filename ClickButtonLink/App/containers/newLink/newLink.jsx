﻿import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import {
    addLink,
    getProject,
    changeLinkName,
    changeLinkDescription,
    changeLinkValue,
    changeLinkIsActive
} from './newLinkActions.jsx'

class NewLink extends React.Component {
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
            <div id="link">
                <h3>Новая ссылка</h3>
                <div className="form-group">
                    <label>Название</label>
                    <input
                        type="input"
                        className="form-control"
                        value={this.props.data.linkName}
                        onChange={(e) => this.props.changeLinkName(e.target.value)}
                        placeholder="Введите название ссылки"
                    />
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input
                        type="input"
                        className="form-control"
                        value={this.props.data.linkDescription}
                        onChange={(e) => this.props.changeLinkDescription(e.target.value)}
                        placeholder="Введите описание ссылки"
                    />
                </div>
                <div className="form-group">
                    <label>Полная ссылка</label>
                    <input
                        type="input"
                        className="form-control"
                        value={this.props.data.linkValue}
                        onChange={(e) => this.props.changeLinkValue(e.target.value)}
                        placeholder="Введите полную ссылку"
                    />
                </div>
                <div className="form-check">                    
                    <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={(e) => this.props.changeLinkIsActive(e.target.checked)}
                        checked={this.props.data.linkIsActive}
                    />
                    <label className="form-check-label">Ссылка активна?</label>
                </div>
                <input
                    type="button"
                    className="btn btn-primary"
                    value="Отправить"
                    onClick={() => this.props.addLink(
                        this.props.data.project.projectId,
                        this.props.data.linkName,
                        this.props.data.linkDescription,
                        this.props.data.linkValue,
                        this.props.data.linkIsActive)}
                />
            </div>
        );
    }

};

let mapProps = (state) => {
    return {
        data: state.newLink
    }
}

let mapDispatch = (dispatch) => {
    return {
        addLink: bindActionCreators(addLink, dispatch),
        getProject: bindActionCreators(getProject, dispatch),
        changeLinkName: bindActionCreators(changeLinkName, dispatch),
        changeLinkDescription: bindActionCreators(changeLinkDescription, dispatch),
        changeLinkValue: bindActionCreators(changeLinkValue, dispatch),
        changeLinkIsActive: bindActionCreators(changeLinkIsActive, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(NewLink)