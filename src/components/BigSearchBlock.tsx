import React from 'react';
import { connect } from 'react-redux';
import { IBigSearchBlock } from '../types';
import SearchFormHome from './SearchFormHome';

const mapStateToProps = (reducer:any) => {
    const { bigSearchBlockState } = reducer
    return {
        ...bigSearchBlockState
    }
}

class BigSearchBlock extends React.Component<IBigSearchBlock, IBigSearchBlock> {
    render() {
        const { searchFormState } = this.props

        return (
            <div className="BigSearchBlock">
                <div className="standart-container">
                    <h1>Знайдіть та забронюй</h1>
                    <h3>Ви зможете отримати ваше бронювання у зручній для вас аптеці, без черги</h3>
                    <SearchFormHome {...searchFormState}/> 
                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps)(BigSearchBlock)