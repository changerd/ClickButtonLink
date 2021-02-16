import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

export default class ProjectItem extends React.Component {

    render() {
        let linkBlock;
        if (!this.props.isFull) {
            linkBlock =
                <Link className="link" to={"/links?projectId=" + this.props.data.projectId}>{this.props.data.linkCount} ссылок</Link>;
        }

        const deleteBlock =
            <button className="btn btn-dark" data-toggle="modal" data-target="#deleteProjectModal">Удалить проект</button>

        const deleteModal =
            <div className="modal fade" id="deleteProjectModal" tabIndex="-1" role="dialog" aria-labelledby="deleteProjectModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteProjectModalLabel">Удаление проекта</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Вы уверены что хотите удалить проект: <b>{this.props.data.projectName}</b>?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                            <button type="button" className="btn btn-danger" onClick={() => { this.props.deleteProject(this.props.data.projectId); }}>Удалить</button>
                        </div>
                    </div>
                </div>
            </div>


        const editBlock =
            <Link className="btn btn-dark" to={"/projects/edit?projectId=" + this.props.data.projectId} >Редактировать</Link>

        return (
            <tr id="projectItem">
                <td>{this.props.data.projectName}</td>
                <td>{this.props.data.transitionCount}</td>
                <td>{linkBlock}</td>
                <td>
                    {editBlock} {deleteBlock} {deleteModal}
                </td>
            </tr>
        );

    }
} 