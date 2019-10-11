import React from 'react';
import { connect } from 'react-redux';
import { IPromotionsSmallBox } from '../types';
import PromotionsSmallList from './PromotionsSmallList';
import PromotionBigItem from './PromotionBigItem';

const mapStateToProps = (reducer:any) => {
    const { promotionsSmallBoxState } = reducer.HomeReducer
    return {
        ...promotionsSmallBoxState
    }
}

class PromotionsSmallBox extends React.Component<IPromotionsSmallBox, IPromotionsSmallBox> {
    render() {
        const { promotionsSmallList, promotionsBigList } = this.props

        return (
            <div className="PromotionsSmallBox standart-container">
                <PromotionsSmallList items={promotionsSmallList}/>
                <PromotionBigItem items={promotionsBigList}/>
            </div>   
        )
    }
}


export default connect(mapStateToProps)(PromotionsSmallBox)