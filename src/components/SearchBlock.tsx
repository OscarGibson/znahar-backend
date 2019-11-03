import React from 'react'
import { connect } from 'react-redux'
import SearchList from './SearchList'
import SearchForm from './SearchForm'
import { IHandleSearch, IWarehouse } from '../types'
import Paginator from './Paginator'
import { PAGINATION_OPTIONS } from './Paginator/Paginator.types';

interface SearchBlockProps {
    products:Array<any>,
    isRequestSended:boolean,
    isResponseRecieved:boolean,
    searchInput:string,
    selectedFilter:string,
    searchFormSubmitted:boolean,
    handleSearch:IHandleSearch,
    warehousesList:IWarehouse[],
    changeOffset:(newOffset:number) => void,
    changeLimit:(newLimit:PAGINATION_OPTIONS) => void
}

interface SearchBlockState {

}

const mapStateToProps = (reducer:any, other:any) => {
    const { SearchReducer } = reducer
    const { warehouses } = reducer.DefaultReducer
    const { productsRequestState, searchFormState } = SearchReducer
    const { products, isRequestSended, isResponseRecieved } = productsRequestState
    const { searchFormSubmitted, searchInput, selectedFilter } = searchFormState
    return {
        products, isRequestSended, isResponseRecieved,
        searchInput, searchFormSubmitted,
        warehousesList:warehouses,
        selectedFilter
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        changeOffset:(newOffset:number) => {dispatch(Paginator.Actions.changeOffset(newOffset))},
        changeLimit:(newLimit:PAGINATION_OPTIONS) => {dispatch(Paginator.Actions.changeLimit(newLimit))}
    }
}

const SearchTableHeader = () => {
    return(
        <thead className="thead-dark">
            <tr>
                <th>Назва Товару</th>
                <th>Аптека</th>
                <th>Ціна</th>
                {/* <th>Кількість</th> */}
                <th></th>
            </tr> 
        </thead>
    )
}

const XOR = (a:boolean,b:boolean) => {
    return !( ( a && !b ) || ( !a && b ) )
}

class SearchBlock extends React.Component<SearchBlockProps, SearchBlockState> {
    constructor(props:SearchBlockProps, state:SearchBlockState) {
        super(props, state)

        this.moveTo = this.moveTo.bind(this)
        this.changeLimit = this.changeLimit.bind(this)
    }
    changeLimit(newLimit:number) {
        const { changeLimit, handleSearch, searchInput, selectedFilter } = this.props
        changeLimit(newLimit)
        handleSearch(searchInput, selectedFilter, -1, newLimit)
    }

    moveTo(limit:number, newPage:number) {
        const { handleSearch, searchInput, selectedFilter, changeOffset } = this.props
        changeOffset(limit * (newPage - 1))
        handleSearch(searchInput, selectedFilter, limit * (newPage - 1))
    }
    render() {
        const {
            products,
            isRequestSended,
            isResponseRecieved,
            handleSearch,
            warehousesList
        } = this.props

        const isProductsLoaded = XOR(isRequestSended, isResponseRecieved)

        return (
            <div className="SearchBlock">
                <SearchForm action={handleSearch}/>
                <table className="table standart-container">
                    <SearchTableHeader />
                    <SearchList
                        products={products}
                        isProductsLoaded={isProductsLoaded}
                        warehousesList={warehousesList}
                    />
                </table>
                {products.length !== 0 ? <Paginator.Component changeLimit={this.changeLimit} moveTo={this.moveTo}/> : ""} 
            </div>
            
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBlock)