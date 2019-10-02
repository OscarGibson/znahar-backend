import React from 'react';
import { connect } from 'react-redux';
import { ICarouselItem } from '../types';

const CarouselItem = ({
        photoUrl, title, description, content
    }:ICarouselItem) => {
    return (
        <div className="CarouselItem">
            <p>{content}</p>
            <img src={photoUrl} alt=""/>
            <h4>{title}</h4>
            <h6>{description}</h6>
        </div>
    )
}

export default connect()(CarouselItem)