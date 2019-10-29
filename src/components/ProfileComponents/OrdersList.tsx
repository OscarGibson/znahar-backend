import React, { Fragment } from 'react'
import { IProductItem, IWarehouse } from '../../types'
import { getWarehouseById } from '../../redusers/initState'
import ActionButton from '../ActionButton'
import { connect } from 'react-redux'
import { plusProductItem, minusProductItem } from '../../actions'

interface OrdersListState {
    products:IProductItem[],
    warehouses:IWarehouse[],
    totalCount:number,
    price:string,
    totalPrice:number,
    removeItemFromCart:(id:string) => void,
    createOrder:() => void,
    plusProductItem:(productId:string, warehouseId:string, currentQuantity:number) => void,
    minusProductItem:(productId:string, warehouseId:string, currentQuantity:number) => void
}

const discountBlock = (totalPrice:number) => {
    console.log("totalPrice", totalPrice)
    if (totalPrice !== -1)
        return (
            <div className="info">
                <span className="text">{`Зі знижкою ${totalPrice.toFixed(2)} грн`}</span>
            </div>
        )
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        plusProductItem:(productId:string, warehouseId:string, currentQuantity:number) => {
            dispatch(plusProductItem(productId, warehouseId, currentQuantity))
        },
        minusProductItem:(productId:string, warehouseId:string, currentQuantity:number) => {
            dispatch(minusProductItem(productId, warehouseId, currentQuantity))
        }
    }
}

const renderInfoBlock = (totalCount:number, createOrder:() => void, price:string, totalPrice:number) => {
    if (totalCount === 0) {
        return (
            <div className="info">
                <span className="text">Мої Бронювання</span>
                <ActionButton
                    text={"Пошук Товарів"}
                    action={() => {window.location.href = "/search"}}
                    classList={["default-button", "button"]}
                    iconName=""
                    iconSvgSrc=""
                />
            </div>
        )
    } else {
        return (
            <Fragment>
                <div className="info">
                    <span className="text">{`Мої Бронювання (${totalCount}од. / ${price} грн)`}</span>
                    <ActionButton
                        text={"Підтвердити"}
                        action={createOrder}
                        classList={["default-button", "button"]}
                        iconName=""
                        iconSvgSrc=""
                    />
                </div>
                {discountBlock(totalPrice)}
            </Fragment>
        )
    }
}

const OrdersList = (props:OrdersListState) => {
    const { products, warehouses, removeItemFromCart,
        totalCount, price, createOrder, totalPrice, plusProductItem, minusProductItem } = props
    return (
        <div className="ordersList cart">
            {renderInfoBlock(totalCount, createOrder, price, totalPrice)}
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Назва Товару</th>
                        <th>Аптека</th>
                        <th>Ціна</th>
                        <th>Кількість</th>
                        <th></th>
                    </tr> 
                </thead>
                <tbody>
                    {products.map( (product, index) => {
                        const { name, warehouse_id, price, count, id } = product
                        const warehouse = getWarehouseById(warehouse_id, warehouses)
                        if (warehouse)
                            return (
                                <tr key={`order-item-${index}`}>
                                    <td>{name}</td>
                                    <td>{`№${warehouse_id} ${warehouse.name}`}</td>
                                    <td>{price.toFixed(2)}грн</td>
                                    <td className="td-buttons">
                                        <span className="button" onClick={() => {minusProductItem(id, warehouse_id, count)}}>-</span>
                                        <span className="button">{count}</span>
                                        <span className="button" onClick={() => {plusProductItem(id, warehouse_id, count)}}>+</span>
                                    </td>
                                    <td>
                                        <ActionButton
                                            text=""
                                            iconName=""
                                            iconSvgSrc="/static/svg/huge_bin.svg"
                                            classList={["delete-icon"]}
                                            action={() => {removeItemFromCart(id)}}
                                        />
                                    </td>
                                </tr>
                            )
                    })}
                </tbody>
            </table>
        </div> 
    )
}

export default connect(null, mapDispatchToProps)(OrdersList)