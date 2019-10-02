import React from 'react';
import { connect } from 'react-redux';
import { IActionButton } from '../types';

const renderIcon = (iconName:string, iconSvgSrc:string) => {
    if (iconName)
        return (<i className={`${iconName} custom-icon`} />)
    if (iconSvgSrc)
        return (<img src={iconSvgSrc} alt="" />)
}

const ActionButton = ({ iconName, iconSvgSrc, text, classList, action }:IActionButton) => {
    const classes:string = ["ActionButton", ...classList].join(" ")
    return (
        <div className={classes} onClick={action}>
            {renderIcon(iconName, iconSvgSrc)}
            <span>{text}</span>
        </div>
    )
}

export default connect()(ActionButton)
