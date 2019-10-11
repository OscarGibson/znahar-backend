import React from 'react';
import { connect } from 'react-redux';
import { IBigSearchBlock } from '../types';
import SearchFormHome from './SearchFormHome';

const mapStateToProps = (reducer:any):IBigSearchBlock => {
    const { bigSearchBlockState } = reducer.HomeReducer
    const { warehouses } = reducer.DefaultReducer
    return {
        ...bigSearchBlockState,
        warehouses
    }
}

const action = (searchKey:string, selectedFiler:string|undefined) => {
    window.location.href = `/search?searchKey=${searchKey}&selectedFilter=${selectedFiler}`
}

class BigSearchBlock extends React.Component<IBigSearchBlock, IBigSearchBlock> {
    render() {
        return (
            <div className="BigSearchBlock">
                <div className="standart-container">
                    <h1>Знайдіть та забронюй</h1>
                    <h3>Ви зможете отримати ваше бронювання у зручній для вас аптеці, без черги</h3>
                    <SearchFormHome action={action}/> 
                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps)(BigSearchBlock)