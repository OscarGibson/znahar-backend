import React from 'react';
import { connect } from 'react-redux';
import SearchListItem, { SearchListItemProps } from './SearchListItem';

interface SearchListProps {
    products:Array<SearchListItemProps>,
    isProductsLoaded:boolean
}

interface SearchListState {
    products:Array<SearchListItemProps>
}

const XOR = (a:boolean,b:boolean) => {
    return !( ( a && !b ) || ( !a && b ) )
}

const mapStateToProps = (reducer:any, other:any) => {
    const { 
        products,
        isRequestSended,
        isResponseRecieved
    } = reducer.SearchReducer.productsRequestState
    const isProductsLoaded = XOR(isRequestSended, isResponseRecieved)
    return {
        products, isProductsLoaded
    }
}

class SearchListComponent extends React.Component<SearchListProps, SearchListState> {
    // constructor(props:SearchListProps, state:SearchListState) {
    //     super(props, state)

    //     this.state = {
    //         products:props.products
    //     }
    // }

    // componentWillUpdate(props:SearchListProps, state:SearchListState) {
    //     console.log("SearchListComponentWillUpdate", props, state)
    //     this.setState({
    //         products: props.products
    //     })
    // }

    render() {
        // console.log("RENDER SEARCH LIST", this.props)
        const {
            products, isProductsLoaded
        } = this.props

        if (isProductsLoaded)
            return (
                <tbody>
                    {products.map((product:SearchListItemProps, index:number) => {
                        return (
                            <SearchListItem 
                                key={index}
                                id={product.id}
                                index={index}
                                name={product.name}
                                warehouse_id={product.warehouse_id}
                                photoUrl={product.photoUrl}
                                price={product.price}
                                discount={product.discount}
                                remain={product.remain}
                            />
                        )   
                    })}
                </tbody>
            )
        else
            return (
                <h1>No results</h1>
            )
    }
}

const SearchList = connect(mapStateToProps)(SearchListComponent)

export default SearchList
