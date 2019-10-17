import React from 'react';
import { connect } from 'react-redux';
import { IPromotionBigItem } from '../types';
import ActionButton from './ActionButton';
import { IMAGES_BACKEND } from '../constants';

interface IPromotionBigItemComponent {
    items:IPromotionBigItem[]
}

const redirectToSearch = (title:string) => {
    window.location.href = `/search?searchKey=${title}`
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
                                    action={() => {redirectToSearch(item.title)}}
                                />
                            </div>
                            <div className="imageBlock d-none d-md-block d-lg-block">
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