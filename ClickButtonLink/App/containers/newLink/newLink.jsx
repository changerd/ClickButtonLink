import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { addLink, getProject } from './newLinkActions.jsx'

class NewLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linkName: '',
            linkDescription: '',
            linkValue: '',
            linkIsActive: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    }

    handleChange(event) {
        const { id, value } = event.currentTarget;
        this.setState({ [id]: event.target.value })
    }

    handleCheckBoxChange(event) {
        this.setState({ linkIsActive: event.target.checked })
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
                        id="linkName"
                        className="form-control"
                        value={this.state.linkName}
                        onChange={this.handleChange}
                        placeholder="Введите название ссылки"
                    />
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input
                        type="input"
                        id="linkDescription"
                        className="form-control"
                        value={this.state.linkDescription}
                        onChange={this.handleChange}
                        placeholder="Введите описание ссылки"
                    />
                </div>
                <div className="form-group">
                    <label>Полная ссылка</label>
                    <input
                        type="input"
                        id="linkValue"
                        className="form-control"
                        value={this.state.linkValue}
                        onChange={this.handleChange}
                        placeholder="Введите полную ссылку"
                    />
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="linkIsActive"
                        onChange={this.handleCheckBoxChange}
                        checked={this.state.linkIsActive}
                    />
                    <label className="form-check-label">Ссылка активна?</label>
                </div>
                <input
                    type="button"
                    className="btn btn-primary"
                    value="Отправить"
                    onClick={() => {
                        if (!this.state.linkName) {
                            alert('Необходимо заполнить название ссылки');
                        } else if (!this.state.linkDescription) {
                            alert('Необходимо заполнить описание ссылки');
                            dispatch({ type: ADD_LINK_ERROR, payload: 'Необходимо заполнить описание ссылки' });
                        } else if (!this.state.linkValue) {
                            alert('Необходимо заполнить полную ссылку');
                            dispatch({ type: ADD_LINK_ERROR, payload: 'Необходимо заполнить полную ссылку' });
                        } else {
                            this.props.addLink(
                                this.props.data.project.projectId,
                                this.state.linkName,
                                this.state.linkDescription,
                                this.state.linkValue,
                                this.state.linkIsActive)
                        }
                    }
                }                    
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
        getProject: bindActionCreators(getProject, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(NewLink)