import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { ProjectItem } from './components/projectItem.jsx';
import { getProjects } from './projectsActions.jsx';
import "isomorphic-fetch";

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: location.search };
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        this.getProjects();
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
        const total = this.props.posts.totalPages;
        const pageSize = this.props.posts.pageSize;
        const pageNumbers = [];
        let params = queryString.parse(location.search);
        let queryTrailer = '';
        for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li key={number}>
                    <Link className="link" to={"/blog?pageIndex=" + (number - 1) + queryTrailer}>{number}</Link>
                </li>
            );
        });

        let projects = this.props.projects.records.map(item => {
            return (
                <ProjectItem key={item.projectId} data={item} isFull={false} /*isLogged={this.props.isLogged}*/ />
            );
        });

        return (
            <div id="projects">
                <table className="table">
                    <thread>
                        <tr>
                            <th scope="col">Название</th>
                            <th scope="col">Переходов</th>
                            <th scope="col">Ссылки</th>
                        </tr>
                    </thread>
                    <tbody>
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
        error: state.blog.error,
    }
}

let mapDispatch = (dispatch) => {
    return {
        getProjects: bindActionCreators(getProjects, dispatch),
    }
}

export default connect(mapProps, mapDispatch)(Projects)