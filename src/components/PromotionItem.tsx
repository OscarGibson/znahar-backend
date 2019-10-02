import React from 'react';
import { connect } from 'react-redux';
import { IPromotionItem } from '../types';
import { IMAGES_BACKEND } from '../constants';


class PromotionItem extends React.Component<IPromotionItem, IPromotionItem> {
    render() {
        const {
            image,
            title,
            description,
            price,
            discount_price,
            discount
        } = this.props

        return (
            <div className="PromotionItem">
                <div className="imageBlock">
                    <img src={`${IMAGES_BACKEND}${image}`} alt="photoUrl" className="image"/>
                    <p className="discount">-{discount}%</p>
                </div>
                <h1 className="name">{title}</h1>
                <h3 className="description">{description}</h3>
                <div className="priceBlock">
                    <p className="price">{price}</p>
                    <p className="discountPrice">{discount_price}</p>
                </div>
            </div>
        )
    }
}


export default connect()(PromotionItem)