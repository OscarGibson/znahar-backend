import React from 'react';
import { connect } from 'react-redux';
import { IPromotionItem } from '../types';
import { IMAGES_BACKEND } from '../constants';


class PromotionItem extends React.Component<IPromotionItem, IPromotionItem> {
    constructor(props:IPromotionItem, state:IPromotionItem) {
        super(props, state)

        this.redirectToSearch = this.redirectToSearch.bind(this)
    }

    redirectToSearch(title:string) {
        window.location.href = `/search?searchKey=${title}`
    }
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
            <div onClick={() => {this.redirectToSearch(title)}} className="PromotionItem col-md-3 col-sm-6 col-xs-12">
                <div className="imageBlock">
                    <img src={`${IMAGES_BACKEND}${image}`} alt="photoUrl" className="image"/>
                    <p className="discount">-{discount}%</p>
                </div>
                <h1 className="name">{title}</h1>
                <h3 className="description">{description}</h3>
                <div className="priceBlock">
                    <p className="price">{discount_price}грн</p>
                    <p className="discountPrice">{price}грн</p>
                </div>
            </div>
        )
    }
}


export default connect()(PromotionItem)