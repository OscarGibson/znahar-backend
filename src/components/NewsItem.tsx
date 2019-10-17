import React from 'react'
import { connect } from 'react-redux'
import { INewsItem } from '../types'

const NewsItem = ({
    image, title, 
    content_short, date,
}:INewsItem) => {
    return (
        <div className="NewsItem">
            <img className="image" src={image} alt="photoUrl"/>
            <h6 className="title">{title}</h6>
            <p className="description">{content_short.slice(0, 75)}...</p>
            <div className="bottomBlock">
                <p className="date">{date}</p>
                {/* <p className="views">{views}</p> */}
            </div>
        </div>
    )
}

export default connect()(NewsItem)