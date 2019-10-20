import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import {
    editLink,
    getLink,
    changeLinkName,
    changeLinkDescription,
    changeLinkValue,
    changeLinkIsActive
} from './editLinkActions.jsx'

class EditLink extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const parsed = queryString.parse(location.search);
        if (parsed) {
            this.props.getLink(parsed['linkId']);
        }
    }   

    render() {
        return (
            <div id="editLink">
                <h3>Редактирование ссылки</h3>
                <div className="form-group">
                    <label>Название</label>
                    <input
                        type="input"
                        className="form-control"
                        value={this.props.data.link.linkName}
                        onChange={(e) => this.props.changeLinkName(e.target.value)}
                        placeholder="Введите название ссылки"
                    />
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input
                        type="input"
                        className="form-control"
                        value={this.props.data.link.linkDescription}
                        onChange={(e) => this.props.changeLinkDescription(e.target.value)}
                        placeholder="Введите описание ссылки"
                    />
                </div>
                <div className="form-group">
                    <label>Полная ссылка</label>
                    <input
                        type="input"
                        className="form-control"
                        value={this.props.data.link.linkValue}
                        onChange={(e) => this.props.changeLinkValue(e.target.value)}
                        placeholder="Введите полную ссылку"
                    />
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={(e) => this.props.changeLinkIsActive(e.target.checked)}
                        checked={this.props.data.link.linkIsActive}
                    />
                    <label className="form-check-label">Ссылка активна?</label>
                </div>
                <input
                    type="button"
                    className="btn btn-primary"
                    value="Отправить"
                    onClick={() => this.props.editLink(
                        this.props.data.link.linkId,
                        this.props.data.link.projectId,
                        this.props.data.link.linkName,
                        this.props.data.link.linkDescription,
                        this.props.data.link.linkValue,
                        this.props.data.link.linkIsActive
                    )}
                />
            </div>
            )
    }
};

let mapProps = (state) => {
    return {
        data: state.editLink
    }
}

let mapDispatch = (dispatch) => {
    return {
        editLink: bindActionCreators(editLink, dispatch),
        getLink: bindActionCreators(getLink, dispatch),
        changeLinkName: bindActionCreators(changeLinkName, dispatch),
        changeLinkDescription: bindActionCreators(changeLinkDescription, dispatch),
        changeLinkValue: bindActionCreators(changeLinkValue, dispatch),
        changeLinkIsActive: bindActionCreators(changeLinkIsActive, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(EditLink)