import React from 'react'
import { connect } from 'react-redux'
import { setPromotions } from '../actions'
import { IPromotionsPage } from '../types'
import axios from 'axios'
import { GET_PROMOTIONS_URL } from '../constants';
import MainMenuSimple from '../components/MainMenuSimple';
import { mainMenuSimpleState } from '../redusers/initState';
import Breadcrumbp from '../components/Breadcrumbp';
import PromotionItem from '../components/PromotionItem';
import ActionButton from '../components/ActionButton';

const mapStateToProps = (reducer:any) => {
    const { PromotionsReducer } = reducer
    return {
        ...PromotionsReducer
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        setPromotions: (payload:any) => {dispatch(setPromotions(payload))}
    }
}

const redirectToSearch = (title:string) => {
    window.location.href = `/search?searchKey=${title}`
}


class PromotionsPage extends React.Component<IPromotionsPage, IPromotionsPage> {

    constructor(props:IPromotionsPage, state:IPromotionsPage) {
        super(props, state)

        this.getPromotions = this.getPromotions.bind(this)
    }

    componentDidMount() {
        this.getPromotions()
    }

    getPromotions() {
        const { setPromotions } = this.props
        axios.get(GET_PROMOTIONS_URL, {})
        .then((response) => {
            if (response.status === 200) {
                const { promotions, promotions_big } = response.data
                setPromotions({promotions, promotions_big})
            }
        })
        .catch((error) => {
            console.log("ERROR", error)
        })
        .finally(() => {  
        })
    }

    render() {
        const { promotions, promotions_big } = this.props
        return (
            <div className="Promotions">
                <MainMenuSimple { ...mainMenuSimpleState }/>
                <div className="header">
                    <div className="content standart-container">
                        <h1 className="title">Акції</h1>
                        <Breadcrumbp
                            pages={[{
                                name:"Головна",
                                url:"/"
                            },{
                                name:"Акції",
                                url:null
                            }]}
                        />
                    </div>
                </div>

                <div className="body standart-container">
                    <div className="promotions row">
                        {promotions.map( (item, index) => {
                            return (
                                <PromotionItem key={index} {...item}/>
                            )
                        })}
                    </div>
                    <div className="PromotionBigItem">
                        {promotions_big.map( (item, index) => {
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
                                    <div className="imageBlock">
                                        <img src={`${item.photo}`} alt="photoUrl"/>
                                    </div>
                                </div>
                            )
                        })}
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PromotionsPage)