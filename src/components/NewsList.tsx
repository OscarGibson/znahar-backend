import React from 'react';
import { connect } from 'react-redux';
import { INewsItem } from '../types';
import NewsItem from './NewsItem';

interface INewsList {
    items:INewsItem[]
}

class NewsList extends React.Component<INewsList, INewsList> {
    render() {
        const { items } = this.props

        return (
            <div className="NewsList standart-container">
                <h1 className="title">Актуальні Новини</h1>
                <div className="divider"></div>
                <div className="itemsList row">
                    {items.map( (item, index) => {
                        return (
                            <NewsItem key={index} {...item}/>
                        )
                    })}
                </div>
                <div>
                </div>
            </div>
        )
    }
}


export default connect()(NewsList)