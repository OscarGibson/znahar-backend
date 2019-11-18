import React from 'react'
import { connect } from 'react-redux'
import { IPromotionItem } from '../types'
import PromotionItem from './PromotionItem'
import ActionButton from './ActionButton'


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
        return (
            <div className="PromotionsSmallList row">
                <div className="slider">
                    <div id="multi-item-example" className="carousel slide carousel-multi-item" data-ride="carousel">
                        <div className="carousel-inner">
                            {chunk(items, 4).map( (itemGroup, index) => {
                                return (
                                    <div key={`promotion-group-${index}`} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                    {itemGroup.map( (item, index_2) => {
                                        return (
                                            <PromotionItem key={`promotion-item-${index}-${index_2}`} {...item}/>
                                        )
                                    })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <ActionButton
                    text={"Показати всі Пропозиції"}
                    action={() => {window.location.href = "/promotions"}}
                    iconName=""
                    iconSvgSrc=""
                    classList={["default-button"]}
                />
                {/* <div className="controls-top mr-auto">
                    <a className="btn-floating" href="#multi-item-example" data-slide="prev"><i className="fas fa-chevron-left"></i></a>
                    <a className="btn-floating" href="#multi-item-example" data-slide="next"><i
                        className="fas fa-chevron-right"></i></a>
                </div> */}
            </div>
        )
    }
}


export default connect(mapStateToProps)(PromotionsSmallList)