import React from 'react';
import { connect } from 'react-redux';
import { IMainMenuData } from '../types';
import { Link } from 'react-router-dom';


const FooterMenu = ({ items, logoUrl }:IMainMenuData) => {
    return (
        <div className="FooterMenu">
            <div className="Logo">
                <img src={logoUrl} alt="Logo"/>
            </div>
            <ul className="nav flex-column menu">
                {items.map( (item, index) => {
                    return (
                        <li key={index} className="nav-item menuItem">
                            <Link className="nav-link menuLink" to={item.url}>
                                {item.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default connect()(FooterMenu)