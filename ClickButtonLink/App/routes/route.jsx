import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import Projects from '../containers/projects/projects.jsx';
import NewProject from '../containers/newProject/newProject.jsx';
import EditProject from '../containers/editProject/editProject.jsx';
import Links from '../containers/links/links.jsx';
import NewLink from '../containers/newLink/newLink.jsx';
import EditLink from '../containers/editLink/editLink.jsx';
import LinkItem from '../containers/linkItem/linkItem.jsx';
import User from '../containers/user/user.jsx';
import NotFoundPage from '../containers/notFound/notFoundPage.jsx';
import Unauthorized from '../containers/unauthorized/unauthorized.jsx';
 
export default class Routing extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path="/link" component={LinkItem} />
                    <Route path="/links/edit" component={EditLink} />
                    <Route path="/links/new" component={NewLink} />
                    <Route path="/links" component={Links} />
                    <Route path="/projects/edit" component={EditProject} />
                    <Route path="/projects/new" component={NewProject} />
                    <Route path="/projects" component={Projects} />
                    <Route path="/user" component={User} />
                    <Route exact path="/" render={() => (<Redirect to="/projects" />)} />
                    <Route path="/unauthorized" component={Unauthorized} />
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </main>
        );
    }
};
