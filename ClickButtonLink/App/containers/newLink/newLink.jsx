import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { addLink, getProject, getProjectsList } from './newLinkActions.jsx';
import ValidationForm from '../../utils/validationForm.js'

class NewLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: '',
            linkName: '',
            linkDescription: '',
            linkValue: '',
            linkIsActive: false,
            isNullProject: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { id, value } = event.currentTarget;
        this.setState({ [id]: event.target.value })
    }

    handleCheckBoxChange(event) {
        this.setState({ linkIsActive: event.target.checked })
    }

    handleSubmit(event) {
        if ((this.state.projectId) && (this.state.linkName) && (this.state.linkValue)) {
            this.props.addLink(
                this.state.projectId,
                this.state.linkName,
                this.state.linkDescription,
                this.state.linkValue,
                this.state.linkIsActive)
        }
        event.preventDefault();
    }

    componentDidMount() {
        this.getProject();
        ValidationForm.validateForm();
    }

    getProject() {
        const parsed = queryString.parse(location.search);
        if (parsed['projectId']) {
            this.props.getProject(parsed['projectId']);
            this.setState({
                projectId: parsed['projectId'],
            })
        } else {
            this.props.getProjectsList();
            this.setState({
                isNullProject: true,
            });
        }
    }

    render() {
        let choseProject = this.state.isNullProject ?
            <div className="form-group">
                <label>Проект</label>
                <select
                    id="projectId"
                    className="form-control"
                    value={this.state.projectId}
                    onChange={this.handleChange}
                    placeholder="Выберите проект"
                    required
                >
                    <option selected disabled key='' value=''>Выберите проект</option>
                    {this.props.data.projectsList.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <div className="invalid-feedback">
                    Выберите проект.
                </div>
            </div>
            :
            null;

        return (
            <div id="link">
                <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
                    <h3>Новая ссылка</h3>
                    {choseProject}
                    <div className="form-group">
                        <label>Название</label>
                        <input
                            type="input"
                            id="linkName"
                            className="form-control"
                            value={this.state.linkName}
                            onChange={this.handleChange}
                            placeholder="Введите название ссылки"
                            required
                        />
                        <div className="invalid-feedback">
                            Название ссылки не должно быть пустым.
                        </div>
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
                            type="url"
                            id="linkValue"
                            className="form-control"
                            value={this.state.linkValue}
                            onChange={this.handleChange}
                            placeholder="Введите полную ссылку"
                            required
                        />
                        <div className="invalid-feedback">
                            Неверный формат ссылки.
                        </div>
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
        data: state.newLink
    }
}

let mapDispatch = (dispatch) => {
    return {
        addLink: bindActionCreators(addLink, dispatch),
        getProject: bindActionCreators(getProject, dispatch),
        getProjectsList: bindActionCreators(getProjectsList, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(NewLink)