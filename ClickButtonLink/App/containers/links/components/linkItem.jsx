import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class LinkItem extends React.Component {

    render() {

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

        return (
            <tr id="linkItem">
                <td>{status}</td>
                <td><Link to={"/link?linkId=" + this.props.data.linkId}>{this.props.data.linkName}</Link></td>
                <td>{this.props.data.transitionCount}</td>
                <td><a target="blank" href={this.props.data.linkValue}>{this.props.data.linkValue}</a></td>
                <td><a href={"/" + this.props.data.linkId}>localhost:44324/{this.props.data.linkId}</a></td>
            </tr>
        );
    }
}