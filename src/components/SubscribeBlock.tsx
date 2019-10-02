import React from 'react';
import { connect } from 'react-redux';
import { ISubscribeBlock } from '../types';
import SubscribeForm from './SubscribeForm';

const SubscribeBlock = ({ title, description, subscribeForm }:ISubscribeBlock) => {
    return (
        <div className="SubscribeBlock">
            <h1 className="title">{title}</h1>
            <h3 className="description">{description}</h3>
            <SubscribeForm {...subscribeForm}/>
        </div>
    )
}

export default connect()(SubscribeBlock)