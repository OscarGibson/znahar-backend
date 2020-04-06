import React, { Fragment } from 'react';
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
    discount_type:number,
    remain:number,
    warehousesList:IWarehouse[],
    producer:string,
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

// const mapStateToProps = (reducer:any, other:any) => {
//     return {
        
//     }
// }

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
        this.getPrice = this.getPrice.bind(this)
        this.renderActionButton = this.renderActionButton.bind(this)
    }

    getPrice(price:number, discount:number, type:number) {
        if (discount && type) {
            let newPrice:number
            if (type === 1) {
                newPrice = price - (price * discount / 100)
            } else if (type === 2) {
                newPrice = price - discount
            } else {
                newPrice = price
            }
            return (
                <Fragment>
                    <span className="old-price">{price.toFixed(2)}грн</span><br/>
                    <span className="new-price">{newPrice.toFixed(2)}грн</span>
                </Fragment>
            )
        } else {
            return (
                <span>{price.toFixed(2)}грн</span>
            )
        }
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
            discount_type,
            producer,
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
            producer, discount_type,
            count:1
        }
        addProductToCart(newProduct)
        addItemTopCart(newProduct.count)
    }

    renderActionButton(remain:number) {
        if (remain < 1) {
            return (
                <div className="addToCart red">
                    <span>Менше однієї упаковки, за довідкою зверніться в кол-центр</span>
                </div>
            )
        } else {
            return (
                <ActionButton
                    text={"Забронювати"}
                    iconName=""
                    iconSvgSrc=""
                    classList={["addToCart"]}
                    action={this.addToCart}
                />
            )
        }
    }

    render() {
        const {
            id, name, warehouse_id, price,
            warehousesList, producer, discount, discount_type,
            remain
        } = this.props
        const warehouse = getWarehouseById(warehouse_id, warehousesList)
        return (
            <tr key={`products-list-item-${id}`} className="products-list-item">
                <td><span></span><span></span> {name}</td>
                <td>{producer}</td>
                <td>{`#${warehouse.uuid} ${warehouse.name}`}</td>
                <td>{this.getPrice(price, discount, discount_type)}</td>
                <td>
                    {this.renderActionButton(remain)}
                </td>
            </tr>
        )
    }
}

const SearchListItem = connect(null, mapDispatchToProps)(SearchListItemComponent)

export default SearchListItem