import React from 'react';
import { connect } from 'react-redux';
import { ICarouselBlock } from '../types';
import CarouselItem from './CarouselItem';
import { Carousel } from 'react-bootstrap';

const CarouselBlock = ({ items, title, activeIndex }:ICarouselBlock) => {
    return (
        <div className="CarouselBlock">
            <h1 className="title">{title}</h1>
            <div className="divider"></div>
            <div className="itemsList">
                <Carousel interval={0}>
                    {items.map( (item, index) => {
                        return (
                            <Carousel.Item key={index} className="CarouselItem">
                                <img
                                    className="d-block w-100"
                                    src={item.photoUrl}
                                    alt={item.title}
                                />
                                <p className="content">{item.content}</p>
                                <Carousel.Caption>
                                    <img
                                        className="d-block w-100"
                                        src={item.photoUrl}
                                        alt={item.title}
                                    />
                                    <h3 className="title">{item.title}</h3>
                                    <h4 className="description">{item.description}</h4>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
        </div>
    )
}

export default connect()(CarouselBlock)