import React from 'react';
import { connect } from 'react-redux';
import { IPromotionBigItem } from '../types';
import ActionButton from './ActionButton';
import { IMAGES_BACKEND } from '../constants';

interface IPromotionBigItemComponent {
    items:IPromotionBigItem[]
}


class PromotionBigItem extends React.Component<IPromotionBigItemComponent, IPromotionBigItemComponent> {
    render() {
        const { items } = this.props

        return (
            <div className="PromotionBigItem">
                {items.map( (item, index) => {
                    return (
                        <div key={index}>
                            <div className="contentBlock">
                                <h1 className="name">{item.title}</h1>
                                <h3 className="description">{item.description}</h3>
                                <ActionButton
                                    text={"Додати до Кошика"}
                                    iconName="fas fa-cart-plus"
                                    iconSvgSrc=""
                                    classList={["default-button"]}
                                    action={() => {console.log("sasaj lalka")}}
                                />
                            </div>
                            <div className="imageBlock">
                                <img src={`${IMAGES_BACKEND}${item.image}`} alt="photoUrl"/>
                            </div>
                        </div>
                    )
                })}
                
            </div>
        )
    }
}


export default connect()(PromotionBigItem)