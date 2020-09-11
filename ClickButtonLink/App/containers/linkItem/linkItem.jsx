import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { getLink, deleteLink } from './linkItemActions.jsx';
import {
    LineChart,
    Line, 
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

class LinkItem extends React.Component {
    constructor(props) {
        super(props);
        this.deleteLink = this.deleteLink.bind(this);
    }

    componentDidMount() {
        const parsed = queryString.parse(location.search);
        if (parsed) {
            this.props.getLink(parsed['linkId']);
        }

    }

    deleteLink(linkId) {
        this.props.deleteLink(linkId)
    }

    render() {
        const monthNames = [
            "Января", "Февраля", "Марта",
            "Апреля", "Мая", "Июня", "Июля",
            "Августа", "Сентября", "Октября",
            "Ноября", "Декабря"
        ];

        let transitionChart = [];
        for (let i = 0; i < this.props.data.arrCount; i++) {
            let month = new Date(this.props.data.transitions[i].transitionDate).getMonth();
            let day = new Date(this.props.data.transitions[i].transitionDate).getDate();
            transitionChart.push({
                name: day + ' ' + monthNames[month],
                Transitions: this.props.data.transitions[i].transitionCount
            });
        }

        let status;
        if (this.props.data.linkIsActive) {
            status =
                <div>
                    <img src="/imgs/Active.png" alt="Status" heigt="32" width="32" />
                </div>
        } else {
            status =
                <div>
                    <img src="/imgs/NoActive.png" alt="Status" heigt="32" width="32" />
                </div>
        }

        const del =
            <button className="btn btn-dark" onClick={() => {
            if (confirm('Вы уверены что хотите удалить ссылку?')) {
                this.deleteLink(this.props.data.linkId);
            }
        }}>Удалить</button>
        const edit =
            <Link className="btn btn-dark" to={"/links/edit?linkId=" + this.props.data.linkId}>Редактировать</Link>


        return (
            <div id="link">
                <br />
                <h2>Сcылка {this.props.data.linkName}</h2>
                <div>
                    <hr />
                    <div>
                        {edit} {del}
                    </div>
                    <hr />
                    <dl className="dl-horizontal">

                        <dt>
                            Статус
                        </dt>

                        <dd>
                            {status}
                        </dd>

                        <dt>
                            Описание ссылки
                        </dt>

                        <dd>
                            {this.props.data.linkDescription}
                        </dd>

                        <dt>
                            Полная ссылка
                        </dt>


                        <dd>
                            <a target="blank" href={this.props.data.linkValue}>{this.props.data.linkValue}</a>
                        </dd>


                        <dt>
                            Короткая ссылка
                        </dt>

                        <dd>                            
                            <a href={"/" + this.props.data.linkId}>localhost:44324/{this.props.data.linkId}</a>
                        </dd>

                        <dt>
                            Всего переходов
                        </dt>

                        <dd>
                            {this.props.data.transitionCount}
                        </dd>

                    </dl>
                </div>
                <LineChart
                    width={500}
                    height={300}
                    data={transitionChart}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Transitions" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
        )
    }
};

let mapProps = (state) => {
    return {
        data: state.linkItem.link
    }
}

let mapDispatch = (dispatch) => {
    return {
        getLink: bindActionCreators(getLink, dispatch),
        deleteLink: bindActionCreators(deleteLink, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(LinkItem)