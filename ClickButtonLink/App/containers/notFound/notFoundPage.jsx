import React from 'react';
import { Link } from 'react-router-dom';
//import ImageNotFound from ''

export default class NotFoundPage extends React.Component {
    render() {
        return (
            <div>
                <p style={{ textAlign: "center" }}>
                    <img src="/imgs/404_notfound.jpg" />
                </p>
                <p style={{ textAlign: "center" }}>
                    <Link to="/">На главную</Link>
                </p>
            </div>
            );
    }
}