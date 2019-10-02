import React from 'react'
import { connect } from 'react-redux'
import { IHomePage } from '../types/Interfaces'
import BigSearchBlock from '../components/BigSearchBlock'
import PromotionsSmallBox from '../components/PromotionsSmallBox'
import NewsBlock from '../components/NewsBlock'
import SubscribeBlock from '../components/SubscribeBlock'
import MainMenuBig from '../components/MainMenuBig'
import { setPromotions, setNews } from '../actions'
import axios from 'axios'
import { GET_PROMOTIONS_URL, GET_NEWS_URL } from '../constants';

const mapDispatchToProps = (dispatch:any) => {
    return {
        setPromotions: (payload:any) => {dispatch(setPromotions(payload))},
        setNews: (payload:any) => {dispatch(setNews(payload))}
    }
}

const mapStateToProps = (reducer:any) => {
    const { HomeReducer } = reducer
    return {
        ...HomeReducer
    }
}

class HomePage extends React.Component<IHomePage, IHomePage> {
    constructor(props:IHomePage, state:IHomePage) {
        super(props, state)

        this.getPromotions = this.getPromotions.bind(this)
        this.getNews = this.getNews.bind(this)
    }

    componentDidMount() {
        this.getNews()
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

    getNews() {
        const { setNews } = this.props
        axios.get(GET_NEWS_URL, {})
        .then((response) => {
            if (response.status === 200) {
                // const { news } = response.data
                setNews(response.data)
            }
        })
        .catch((error) => {
            console.log("ERROR", error)
        })
        .finally(() => {  
        })
    }

    render() {
        const {
            mainMenuOriginState,
            bigSearchBlockState,
            promotionsSmallBoxState,
            newBlockState,
            subscribeBlockState,
        } = this.props
        console.log("HOME PROPS: ", this.props)
        return (
            <div className="HomePage">
                {/* <TopNavBar { ...topNavBarState } /> */}
                <MainMenuBig {...mainMenuOriginState}/>
                <BigSearchBlock {...bigSearchBlockState}/>
                <PromotionsSmallBox {...promotionsSmallBoxState}/>
                <NewsBlock {...newBlockState}/>
                {/* <CarouselBlock {...carouselState}/> */}
                <SubscribeBlock {...subscribeBlockState}/>
            </div>
        )
    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export default Home;
