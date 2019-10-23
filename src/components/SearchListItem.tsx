import React from 'react';
import { connect } from 'react-redux';
import { getWarehouseById } from '../redusers/initState';
import ActionButton from './ActionButton';
import { IInfoLayer, IProductItem, IWarehouse } from '../types';
import { showInfoLayer, addProductToCart, addItemTopCart } from '../actions';

export interface SearchListItemProps {
    id:string,
    index:number,
    name:string,
    warehouse_id:string,
    photoUrl:string,
    price:number,
    discount:number,
    remain:number,
    warehousesList:IWarehouse[],
    showInfoLayer:(payload:any) => void,
    addProductToCart:(payload:IProductItem) => void,
    addItemTopCart:(payload:number) => void
}

export interface SearchListItemState {
    id:string,
    index:number,
    name:string,
    warehouseId:string,
    photoUrl:string,
    price:number,
    discount:number,
    remain:number
}

const mapStateToProps = (reducer:any, other:any) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        showInfoLayer: (payload:IInfoLayer) => {dispatch(showInfoLayer(payload))},
        addProductToCart: (payload:IProductItem) => {dispatch(addProductToCart(payload))},
        addItemTopCart: (payload:number) => {dispatch(addItemTopCart(payload))}
    }
}

class SearchListItemComponent extends React.Component<SearchListItemProps, SearchListItemState> {

    constructor(props:SearchListItemProps, state:SearchListItemState) {
        super(props, state)

        this.addToCart = this.addToCart.bind(this)
    }

    addToCart() {
        const {
            id,
            index,
            name,
            warehouse_id,
            photoUrl,
            price,
            discount,
            remain,
            showInfoLayer,
            addProductToCart,
            addItemTopCart
        } = this.props
        showInfoLayer({
            text:`${name} успішно додано до списку бронювання`,
            timer:1,
        })
        const newProduct:IProductItem = {
            id, index, name, warehouse_id,
            photo_url:photoUrl,
            discount, remain, price,
            count:1
        }
        addProductToCart(newProduct)
        addItemTopCart(newProduct.count)
    }

    render() {
        const {
            id, index, name, warehouse_id, photoUrl, price,
            discount, remain, warehousesList
        } = this.props
        const warehouse = getWarehouseById(warehouse_id, warehousesList)
        return (
            <tr key={id}>
                <td>{name}</td>
                <td>{`#${warehouse.uuid} ${warehouse.name}`}</td>
                <td>{price}грн</td>
                {/* <td></td> */}
                <td>
                    <ActionButton
                        text={"Забронювати"}
                        iconName=""
                        iconSvgSrc=""
                        classList={["addToCart"]}
                        action={this.addToCart}
                    />
                </td>
            </tr>
        )
    }
}

const SearchListItem = connect(null, mapDispatchToProps)(SearchListItemComponent)

export default SearchListItem