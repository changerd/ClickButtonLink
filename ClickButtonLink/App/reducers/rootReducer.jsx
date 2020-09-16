import { combineReducers } from 'redux'
import projects from '../containers/projects/projectsReducer.jsx'
import newProject from '../containers/newProject/newProjectReducer.jsx'
import editProject from '../containers/editProject/editProjectReducer.jsx'
import links from '../containers/links/linksReducer.jsx'
import newLink from '../containers/newLink/newLinkReducer.jsx'
import editLink from '../containers/editLink/editLinkReducer.jsx'
import linkItem from '../containers/linkItem/linkItemReducer.jsx'
import header from '../containers/header/headerReducer.jsx'

export default combineReducers({
    projects,
    newProject,
    editProject,
    links,
    newLink,
    editLink,
    linkItem,
    header,
})