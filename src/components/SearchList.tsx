import React from 'react';
import { connect } from 'react-redux';
import SearchListItem, { SearchListItemProps } from './SearchListItem';
import { IWarehouse } from '../types';

interface SearchListProps {
    products:Array<SearchListItemProps>,
    isProductsLoaded:boolean,
    warehousesList:IWarehouse[],
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

    render() {
        const {
            products, isProductsLoaded, warehousesList
        } = this.props

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
                            warehousesList={warehousesList}
                        />
                    )   
                })}
            </tbody>
        )
    }
}

const SearchList = connect(mapStateToProps)(SearchListComponent)

export default SearchList
