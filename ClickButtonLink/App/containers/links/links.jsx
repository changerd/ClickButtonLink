import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import LinkItem from './components/linkItem.jsx';
import { getLinks } from './linksActions.jsx';
import "isomorphic-fetch";

class Links extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: location.search }

    }

    componentDidMount() {
        this.getLinks();
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.query != location.search) {
            this.setState({ query: location.search });
            this.getLinks();
        }
    }

    getLinks() {
        let pageIndex; let projectId;
        const parsed = queryString.parse(location.search);
        if (parsed) {
            pageIndex = parsed['pageIndex'];
            projectId = parsed['projectId'];
        }
        this.props.getLinks(pageIndex, projectId);
    }

    render() {
        const total = this.props.links.totalPages;
        const pageSize = this.props.links.pageSize;
        const countLinks = this.props.links.countLinks;
        const pageNumbers = [];
        let params = queryString.parse(location.search);
        let queryTrailer = '';
        if (params.projectId) {
            queryTrailer = "&projectId=" + params.projectId;
        }
        for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li className="listPageNumbers" key={number}>
                    <Link className="btn btn-dark" to={"/links?pageIndex=" + (number - 1) + queryTrailer}>{number}</Link>
                </li>
            );
        });

        let links;

        if (this.props.links.records) {
            links = this.props.links.records.map(item => {
                return (
                    <LinkItem key={item.linkId} data={item} isFull={false} />
                );
            });
        }

        let linksheader =
            <div id="linksheader">
                <div className="row">
                    <div className="col">
                        <h3>Все ссылки</h3>
                    </div>
                    <div className="col-10">
                        <i>{countLinks} ссылки</i>
                    </div>
                </div>
            </div>;

        if (this.props.links.projectId != 0) {
            linksheader =
                <div id="linksheader">
                    <div className="row">
                        <div className="col-md-10">
                            <div className="row project-name-header">
                                <h3>{this.props.links.projectName}</h3>
                                <i>{countLinks} ссылки</i>
                            </div>

                        </div>
                        <div className="col-md-2 text-right">
                            <Link className="btn btn-primary" to={"/links/new?projectId=" + this.props.links.projectId}>Создать ссылку</Link>
                        </div>

                    </div>
                    <div>
                        <i>{this.props.links.projectDescription}</i>
                    </div>
                </div>
        }

        return (
            <div id="links">
                <br />
                {linksheader}
                <br />
                <table className="table">
                    <tbody>
                        <tr>
                            <th scope="col">Статус</th>
                            <th scope="col">Название</th>
                            <th scope="col">Переходов</th>
                            <th scope="col">Полная ссылка</th>
                            <th scope="col">Короткая ссылка</th>
                        </tr>
                        {links}
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
        links: state.links.data,
        error: state.links.error
    }
}

let mapDispatch = (dispatch) => {
    return {
        getLinks: bindActionCreators(getLinks, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(Links)