import React from 'react';
import { connect } from 'react-redux';
import { INewsBlock } from '../types';
import NewsList from './NewsList';


class NewsBlock extends React.Component<INewsBlock, INewsBlock> {
    render() {
        const { newList } = this.props

        return (
            <div className="NewsBlock">
                <NewsList items={newList}/>
            </div>
        )
    }
}


export default connect()(NewsBlock)