import React from 'react';
import { connect } from 'react-redux';
import { ISocialList } from '../types';


const FooterSocial = ({ items, title }:ISocialList) => {
    return (
        <div className="FooterSocial">
            <h2 className="footerHeader">{title}</h2>
            <div className="social">
                {items.map( (item, index) => {
                    return (
                        <a key={index} href={item.link}>
                            <img src={`/static/svg/${item.iconName}.svg`} alt=""/>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

export default connect()(FooterSocial)