import {
    ADD_PROJECT_START,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_ERROR
} from './newProjectConstants.jsx'
import "isomorphic-fetch"

export function addProject(projectName, projectDescription) {
    var addProjectData = { 
        projectName: projectName, 
        projectDescription: projectDescription 
    }

    return {
        type: 'PROMISE',
        actions: [ADD_PROJECT_START, ADD_PROJECT_SUCCESS, ADD_PROJECT_ERROR],
        url: constants.project,
        method: 'POST',
        data: addProjectData,
    };
}
