import React from 'react'
import { connect } from 'react-redux'
import SearchList from './SearchList'
import SearchForm from './SearchForm'
import { IHandleSearch } from '../types'

interface SearchBlockProps {
    products:Array<any>,
    isRequestSended:boolean,
    isResponseRecieved:boolean,
    searchInput:string,
    searchFormSubmitted:boolean,
    handleSearch:IHandleSearch
}

interface SearchBlockState {

}

const mapStateToProps = (reducer:any, other:any) => {
    console.log("mapStateToProps in SEARCHBLOCK:", reducer, other)
    const { SearchReducer } = reducer
    const { productsRequestState, searchFormState } = SearchReducer
    const { products, isRequestSended, isResponseRecieved } = productsRequestState
    const { searchFormSubmitted, searchInput } = searchFormState
    return {
        products, isRequestSended, isResponseRecieved,
        searchInput, searchFormSubmitted
    }
}

const SearchTableHeader = () => {
    return(
        <thead className="thead-dark">
            <tr>
                <th>Назва Товару</th>
                <th>Аптека</th>
                <th>Ціна</th>
                <th>Кількість</th>
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
        console.log("RERENDER SEARCH BLOCK")
        const {
            products,
            isRequestSended,
            isResponseRecieved,
            handleSearch
        } = this.props

        const isProductsLoaded = XOR(isRequestSended, isResponseRecieved)

        return (
            <div className="SearchBlock">
                <SearchForm action={handleSearch}/>
                <table className="table standart-container">
                    <SearchTableHeader />
                    <SearchList products={products} isProductsLoaded={isProductsLoaded}/>
                </table>     
            </div>
            
        )
    }
}

export default connect(mapStateToProps)(SearchBlock)