import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import Projects from '../containers/projects/projects.jsx';
import NewProject from '../containers/newProject/newProject.jsx';

export default class Routing extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path="/projects" component={Projects} />
                    <Route path="/projects/new" component={NewProject} />
                    <Route exact path="/" render={() => (<Redirect to="/projects" />)} />
                </Switch>
            </main>
        );
    }
};