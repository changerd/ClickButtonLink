import { combineReducers } from 'redux'
import projects from '../containers/projects/projectsReducer.jsx'
import newProject from '../containers/newProject/newProjectReducer.jsx'
import editProject from '../containers/editProject/editProjectReducer.jsx'

export default combineReducers({
    projects,
    newProject,
    editProject
})