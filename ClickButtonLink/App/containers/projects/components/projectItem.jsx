import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react=router-dom'

export default class ProjectItem extends React.Component {

    render() {
        //let countBlock;
        //if (!this.props.isFull) {
        //    countBlock =
        //        <React.Fragment>{this.props.data.transitionCount}</React.Fragment>;
        //}

        let linkBlock;
        if (!this.props.isFull) {
            linkBlock =
                <Link className="link" to={"/links?projectId=" + this.props.data.projectId}>{this.props.data.linkCount} ссылок</Link>;
        }

        let deleteBlock;
        if (this.props.isLogged) {
            deleteBlock =
                <a className="link" onClick={() => {
                    if (confirm('Вы уверены что хотите удалить проект?')) {
                        this.props.deleteProject(this.props.data.projectId);
                    }
                }}>Удалить проект</a>;
        }

        return (
            <tr id="projectItem">
                <td>{this.props.data.projectName}</td>
                <td>{this.props.data.transitionCount}</td>
                <td>{linkBlock}</td>
            </tr>
        );

    }
} 