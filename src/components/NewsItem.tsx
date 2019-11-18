import React from 'react'
import { connect } from 'react-redux'
import { INewsItem } from '../types'

const NewsItem = ({
    image, title, id,
    content_short, date,
}:INewsItem) => {
    return (
        <div className="NewsItem col-md-4 col-sm-6 col-xs-12" onClick={() => {window.location.href = `/news/${id}`}}>
            <img className="image" src={image} alt="photoUrl"/>
            <h6 className="title">{title}</h6>
            <p className="description">{content_short.slice(0, 75)}...</p>
            <div className="bottomBlock">
                <p className="date">{date}</p>
            </div>
        </div>
    )
}

export default connect()(NewsItem)