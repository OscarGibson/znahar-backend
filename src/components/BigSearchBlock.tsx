import React, { Fragment } from 'react';
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
            <Fragment>
                {/* <div className="warning">
                    <div className="standart-container">
                        <h1>!Увага!</h1>
                        <h3>Прийом замовлень на сайті тимчасово недоступний</h3>
                    </div>
                </div> */}
                <div className="BigSearchBlock">
                    <div className="standart-container">
                        <h1>Знайдіть та забронюй</h1>
                        <h3>Ви зможете отримати ваше бронювання у зручній для вас аптеці, без черги</h3>
                        <SearchFormHome action={action}/> 
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default connect(mapStateToProps)(BigSearchBlock)