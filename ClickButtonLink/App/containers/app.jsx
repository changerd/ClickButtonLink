import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/header.jsx';
//import About from './about/about.jsx';
//import Blog from './blog/blog.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Header />
                    <h1>Hello, react</h1>
                    <div className="card">
                        <div className="card-header">
                            Featured
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Cras justo odio</li>
                            <li className="list-group-item">Dapibus ac facilisis in</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
                    </div>
                </div>
            </Router>
        );
    }
};