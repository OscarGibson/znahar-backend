import React from 'react'
import { connect } from 'react-redux'
import SearchList from './SearchList'
import SearchForm from './SearchForm'
import { IHandleSearch, IWarehouse } from '../types'

interface SearchBlockProps {
    products:Array<any>,
    isRequestSended:boolean,
    isResponseRecieved:boolean,
    searchInput:string,
    searchFormSubmitted:boolean,
    handleSearch:IHandleSearch,
    warehousesList:IWarehouse[]
}

interface SearchBlockState {

}

const mapStateToProps = (reducer:any, other:any) => {
    const { SearchReducer } = reducer
    const { warehouses } = reducer.DefaultReducer
    const { productsRequestState, searchFormState } = SearchReducer
    const { products, isRequestSended, isResponseRecieved } = productsRequestState
    const { searchFormSubmitted, searchInput } = searchFormState
    return {
        products, isRequestSended, isResponseRecieved,
        searchInput, searchFormSubmitted,
        warehousesList:warehouses
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
            </div>
            
        )
    }
}

export default connect(mapStateToProps)(SearchBlock)