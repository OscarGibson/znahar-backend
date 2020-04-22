import React from 'react';
import { connect } from 'react-redux';
import { IPromotionItem } from '../types';


const renderPromotionCircle = (discoun_type:string, value:number) => {
    console.log(discoun_type, value)
    switch (discoun_type) {
        case '0':
            break

        case '1':
            return (
            <span className="promotion-circle">-{value} %</span>
            )

        case '2':
            return (
            <span className="promotion-circle">-{value}грн</span>
            )
        
        case '3':
            return (
            <span className="promotion-circle">{value}грн</span>
            )
    
        default:
            break;
    }
}

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
            photo,
            title,
            discount_type,
            value,
        } = this.props
        return (
            <div onClick={() => {this.redirectToSearch(title)}} className="PromotionItem col-md-3 col-sm-6 col-xs-12">
                <div className="imageBlock">
                    <img src={`${photo}`} alt="photoUrl" className="image"/>
                    {renderPromotionCircle(discount_type, value)}
                    <img
                        src="/static/images/bottom-banner.png"
                        alt="самолікування може бути шкідливим для вашого здоров'я"
                        className="bottom-banner"
                    />
                </div>
            </div>
        )
    }
}


export default connect()(PromotionItem)