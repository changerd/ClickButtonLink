import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            //<div className="navbar navbar-inverse navbar-fixed-top">
            //    <div className="navbar-header">
            //        ClickButtonLink
            //        </div>
            //    <div className="navbar-collapse collapse">
            //        <ul className="nav navbar-nav">
            //            <li>Проекты</li>
            //            <li>Ссылки</li>
            //            <li>О программе</li>
            //        </ul>
            //        <ul className="nav navbar-nav navbar-right">
            //            <li>Регистрация</li>
            //            <li>Вход</li>
            //        </ul>
            //    </div>
            //</div>            
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">ClickButtonLink</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/projects">Проекты</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/links">Ссылки</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
};