import React from 'react'
import { connect } from 'react-redux'
import { INewsPostPage } from '../types'
import MainMenuSimple from '../components/MainMenuSimple'
import { mainMenuSimpleState } from '../redusers/initState'
import Breadcrumbp from '../components/Breadcrumbp'
import { RouteComponentProps } from 'react-router-dom'
import { setPromotions, setNewsPost, setNews } from '../actions'
import { GET_PROMOTIONS_URL, GET_NEWS_URL } from '../constants'
import axios from 'axios'
import PromotionItem from '../components/PromotionItem';
import NewsItem from '../components/NewsItem';


interface RouteInfo {
    postId: string;
}

interface ComponentProps extends RouteComponentProps<RouteInfo>, INewsPostPage {
}

const mapStateToProps = (reducer:any) => {
    const { NewsPostReducer } = reducer
    return {
        ...NewsPostReducer
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        setPromotions: (payload:any) => {dispatch(setPromotions(payload))},
        setNewsPost: (payload:any) => {dispatch(setNewsPost(payload))},
        setNews: (payload:any) => {dispatch(setNews(payload))}
    }
}

class NewsPost extends React.Component<ComponentProps, ComponentProps> {

    constructor(props:ComponentProps, state:ComponentProps) {
        super(props, state)

        this.getPromotions = this.getPromotions.bind(this)
        this.getNewsPost = this.getNewsPost.bind(this)
        this.getNews = this.getNews.bind(this)
    }

    componentDidMount() {
        this.getNewsPost()
        this.getPromotions()
        this.getNews()
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

    getNewsPost() {
        const { setNewsPost, match } = this.props
        axios.get(`${GET_NEWS_URL}${match.params.postId}`, {})
        .then((response) => {
            if (response.status === 200) {
                setNewsPost(response.data)
            } else {
                window.location.href = "/news"
            }
        })
        .catch((error) => {
            console.log("ERROR", error)
            window.location.href = "/news"
        })
        .finally(() => {  
        })
    }

    getNews() {
        const { setNews } = this.props
        axios.get(GET_NEWS_URL, {})
        .then((response) => {
            if (response.status === 200) {
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
        const { newsPost, promotions, otherNews } = this.props
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

                <div className="banner">
                    <img className="image" src={newsPost.image} alt=""/>
                </div>

                <div className="body standart-container">
                    <div className="leftBlock">

                        <div className="post">
                            <h1 className="title">{newsPost.title}</h1>
                            <div className="divider"></div>
                            <p className="date">{newsPost.date}</p>
                            <p className="content">{newsPost.content}</p>
                        </div>   

                    </div>
                    <div className="rightBlock">
                    {promotions.map( (item, index) => {
                        return (
                            <PromotionItem key={index} {...item}/>
                        )
                    })}
                    </div>
                    
                </div>

                <h1 className="title">Вас може зацікавити</h1>
                <div className="divider"></div>
                <div className="itemsList standart-container">
                    {otherNews.map( (item, index) => {
                        return (
                            <NewsItem key={index} {...item}/>
                        )
                    })}
                </div> 
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPost)