import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from '../routes/route.jsx';
import Header from './header/header.jsx';
//import About from './about/about.jsx';
//import Blog from './blog/blog.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Header />
                    <Routing />
                </div>
            </Router>
        );
    }
};