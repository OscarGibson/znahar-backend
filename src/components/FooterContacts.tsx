import React from 'react';
import { connect } from 'react-redux';
import { IContactsList } from '../types';


const FooterContacts = ({ items, title }:IContactsList) => {
    return (
        <div className="FooterContacts">
            <h2 className="footerHeader">{title}</h2>
            <ul className="contacts">
                {items.map( (item, index) => {
                    return (
                        <li key={index}>{item}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default connect()(FooterContacts)