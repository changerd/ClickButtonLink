import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { editLink, getLink, getProjectsList } from './editLinkActions.jsx'
import ValidationForm from '../../utils/validationForm.js'

class EditLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: '',
            linkName: '',
            linkDescription: '',
            linkValue: '',
            linkIsActive: false
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
            this.props.editLink(
                this.props.data.link.linkId,
                this.state.projectId,
                this.state.linkName,
                this.state.linkDescription,
                this.state.linkValue,
                this.state.linkIsActive
            )
        }
        event.preventDefault();
    }

    componentDidMount() {
        this.getLink();
        ValidationForm.validateForm();
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.query !== location.search) {
            this.setState({
                query: location.search,
            })
            this.getLink();
        }

        this.setState({
            projectId: this.props.data.link.projectId,
            linkName: this.props.data.link.linkName,
            linkDescription: this.props.data.link.linkDescription,
            linkValue: this.props.data.link.linkValue,
            linkIsActive: this.props.data.link.linkIsActive,
        })
    }

    getLink() {
        const parsed = queryString.parse(location.search);
        if (parsed) {
            this.props.getLink(parsed['linkId']);
            this.props.getProjectsList();
        }
    }

    /*componentDidUpdate(prevProps) {
        if (this.props.data.link.linkName !== prevProps.data.link.linkName) {
            this.setState({
                linkName: this.props.data.link.linkName
            });
        }
        if (this.props.data.link.linkDescription !== prevProps.data.link.linkDescription) {
            this.setState({
                linkDescription: this.props.data.link.linkDescription
            });
        }
        if (this.props.data.link.linkValue !== prevProps.data.link.linkValue) {
            this.setState({
                linkValue: this.props.data.link.linkValue
            });
        }
        if (this.props.data.link.linkIsActive !== prevProps.data.link.linkIsActive) {
            this.setState({
                linkIsActive: this.props.data.link.linkIsActive
            });
        }
    }*/

    render() {
        return (
            <div id="editLink">
                <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
                    <h3>Редактирование ссылки</h3>
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
                            <option disabled key='' value=''>Выберите проект</option>
                            {this.props.data.projectsList.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                        <div className="invalid-feedback">
                            Выберите проект.
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Название</label>
                        <input
                            type="url"
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
                            type="input"
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
                            checked={this.state.linkIsActive}
                            onChange={this.handleCheckBoxChange}
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
        getProjectsList: bindActionCreators(getProjectsList, dispatch),
    }
}

export default connect(mapProps, mapDispatch)(EditLink)