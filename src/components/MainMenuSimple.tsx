import React from 'react';
import { connect } from 'react-redux';
import { IMainMenuData } from '../types';
import { Link } from 'react-router-dom';

const getItemClasses = (isItemActive:boolean):string => {
    return isItemActive ? "nav-item active": "nav-item"
}

const addSpanForSR = (isItemActive:boolean) => {
    if (isItemActive)
        return (
            <span className="sr-only">(current)</span>
        )
}


const MainMenuSimple = ({items, logoUrl}:IMainMenuData) => {
    return (
        <div className="MainMenuSimple">
            <div className="row standart-container menu">
                <div className="col">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <a className="navbar-brand" href="/">
                            <img src={logoUrl} alt="Logo"/>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbarNav collapse navbar-collapse justify-content-center" id="navbarNav">
                            <ul className="navbar-nav nav">
                            {items.map( (item, index) => {
                                return (
                                    <li key={index} className={getItemClasses(false)}>
                                        <Link className="nav-link" to={item.url}>
                                            {item.name}
                                            {addSpanForSR(false)}
                                        </Link>
                                    </li>
                                )
                            })}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default connect()(MainMenuSimple)