import React from 'react';
import { connect } from 'react-redux';
import { IPromotionItem } from '../types'
import PromotionItem from './PromotionItem';
import ActionButton from './ActionButton';


interface IPromotionsSmallList {
    items:IPromotionItem[]
}

const mapStateToProps = (reducer:any) => {
    const { promotionsSmallList } = reducer.HomeReducer.promotionsSmallBoxState
    return {
        ...promotionsSmallList
    }
}

class PromotionsSmallList extends React.Component<IPromotionsSmallList, IPromotionsSmallList> {
    render() {
        const { items } = this.props
        console.log("ITEMS: ", this.props)
        return (
            <div className="PromotionsSmallList">
                {items.map( (item, index) => {
                    return (
                        <PromotionItem key={index} {...item}/>
                    )
                })}
                <ActionButton
                    text={"Показати всі Пропозиції"}
                    action={() => {}}
                    iconName=""
                    iconSvgSrc=""
                    classList={["default-button"]}
                />
            </div>
        )
    }
}


export default connect(mapStateToProps)(PromotionsSmallList)