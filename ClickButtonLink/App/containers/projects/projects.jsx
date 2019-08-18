import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import ProjectItem from './components/projectItem.jsx';
import { getProjects, deleteProject } from './projectsActions.jsx';
import "isomorphic-fetch";

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: location.search };
        this.deleteProject = this.deleteProject.bind(this);
    }

    componentDidMount() {
        this.getProjects();
    }

    deleteProject(projectId) {
        let pageIndex;
        const parsed = queryString.parse(location.search);
        if (parsed) {
            pageIndex = parsed['pageIndex'];
        }
        this.props.deleteProject(projectId, pageIndex);
    }

    getProjects() {
        let pageIndex;
        const parsed = queryString.parse(location.search);
        if (parsed) {
            pageIndex = parsed['pageIndex'];
        }
        this.props.getProjects(pageIndex);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.query != location.search) {
            this.setState({ query: location.search });
            this.getProjects();
        }
    }

    render() {
        const total = this.props.projects.totalPages;
        const pageSize = this.props.projects.pageSize;
        const pageNumbers = [];
        let params = queryString.parse(location.search);
        let queryTrailer = '';
        for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li className="listPageNumbers" key={number}>
                    <Link className="btn btn-dark" to={"/projects?pageIndex=" + (number - 1) + queryTrailer}>{number}</Link>
                </li>
            );
        });

        let projects = this.props.projects.records.map(item => {
            return (
                <ProjectItem key={item.projectId} data={item} isFull={false} /*isLogged={this.props.isLogged}*/ deleteProject={this.deleteProject} />
            );
        });

        return (            
            <div id="projects">
                <Link className="btn btn-primary" to={"/projects/new"}>Создать проект</Link>
                <table className="table">                    
                    <tbody>
                        <tr>
                            <th scope="col">Название</th>
                            <th scope="col">Переходов</th>
                            <th scope="col">Ссылки</th>
                            <th></th>
                        </tr>
                        {projects}
                    </tbody>
                </table>
                <div id="pagingNumber">
                    {renderPageNumbers}
                </div>
            </div>
        );
    }
};

let mapProps = (state) => {
    return {
        projects: state.projects.data,
        error: state.projects.error,
    }
}

let mapDispatch = (dispatch) => {
    return {
        getProjects: bindActionCreators(getProjects, dispatch),
        deleteProject: bindActionCreators(deleteProject, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(Projects)