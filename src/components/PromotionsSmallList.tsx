import React from 'react'
import { connect } from 'react-redux'
import { IPromotionItem } from '../types'
import PromotionItem from './PromotionItem'
import ActionButton from './ActionButton'

import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'


interface IPromotionsSmallList {
    items:IPromotionItem[]
}

const mapStateToProps = (reducer:any) => {
    const { promotionsSmallList } = reducer.HomeReducer.promotionsSmallBoxState
    return {
        ...promotionsSmallList
    }
}

const chunk = (array:IPromotionItem[], size:number):IPromotionItem[][] => {
    const chunked_arr = []
    let copied = [...array]
    const numOfChild = Math.ceil(copied.length / size)
    for (let i = 0; i < numOfChild; i++) {
      chunked_arr.push(copied.splice(0, size))
    }
    return chunked_arr
  }

class PromotionsSmallList extends React.Component<IPromotionsSmallList, IPromotionsSmallList> {
    render() {
        const { items } = this.props
        if (items.length > 0)
            return (
                <div className="PromotionsSmallList row">
                    <OwlCarousel
                        className="owl-theme"
                        loop
                        margin={10}
                        nav
                    >
                    {items.map( (item, index) => {
                        return (
                            <div key={`promotion-item-${index}`} onClick={() => {window.location.href = `/search?searchKey=${item.title}`}} className="item" style={{cursor:"pointer"}}>
                                <div className="imageBlock">
                                    <img src={`${item.photo}`} alt="photoUrl" className="image"/>
                                </div>
                            </div>
                        )
                    })}
                    </OwlCarousel>
                    <ActionButton
                        text={"Показати всі Пропозиції"}
                        action={() => {window.location.href = "/promotions"}}
                        iconName=""
                        iconSvgSrc=""
                        classList={["default-button"]}
                    />
                </div>
            )
        else
            return (
                <div className="PromotionsSmallList row"></div>
            )
    }
}


export default connect(mapStateToProps)(PromotionsSmallList)