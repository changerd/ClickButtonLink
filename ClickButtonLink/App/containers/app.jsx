﻿import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from '../routes/route.jsx';
import Header from './header/header.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Header />
                    <Routing />
                    <footer>
                        <div className="copyrights">
                            <p className="text-center">&copy; 2019 – ClickButtonLink</p>
                        </div>
                    </footer>
                </div>                
            </Router>
        );
    }
};