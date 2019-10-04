import React from 'react'
import { connect } from 'react-redux'
import { INewsPage } from '../types'
import MainMenuSimple from '../components/MainMenuSimple'
import { mainMenuSimpleState } from '../redusers/initState'
import Breadcrumbp from '../components/Breadcrumbp'
import { Link } from 'react-router-dom'
import { setPromotions, setNews } from '../actions'
import { GET_PROMOTIONS_URL, GET_NEWS_URL } from '../constants'
import axios from 'axios'
import PromotionItem from '../components/PromotionItem';


const mapStateToProps = (reducer:any) => {
    const { NewsReducer } = reducer
    console.log("NewsReducer", NewsReducer)
    return {
        ...NewsReducer
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        setPromotions: (payload:any) => {dispatch(setPromotions(payload))},
        setNews: (payload:any) => {dispatch(setNews(payload))}
    }
}

class News extends React.Component<INewsPage, INewsPage> {

    constructor(props:INewsPage, state:INewsPage) {
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
        const { newsList, promotions } = this.props
        return (
            <div className="News">
                <MainMenuSimple { ...mainMenuSimpleState }/>
                <div className="header">
                    <div className="content standart-container">
                        <h1 className="title">Новини</h1>
                        <Breadcrumbp
                            pages={[{
                                name:"Головна",
                                url:"/"
                            },{
                                name:"Новини",
                                url:null
                            }]}
                        />
                    </div>
                </div>

                <div className="body standart-container">
                    <div className="leftBlock">
                    {newsList.map( (post, index) => {
                        return (
                            <div key={index} className="post">
                                <img className="image" src={post.image} alt=""/>
                                <h1 className="title">{post.title}</h1>
                                <p className="date">{post.date}</p>
                                <p className="content">{post.content_short}</p>
                                <Link className="button" to={`/news/${post.id}`}>Читати Далі</Link>
                            </div>    
                        )
                    })}
                    </div>
                    <div className="rightBlock">
                    {promotions.map( (item, index) => {
                        return (
                            <PromotionItem key={index} {...item}/>
                        )
                    })}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)