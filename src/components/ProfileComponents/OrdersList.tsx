import React from 'react'
import { IProductItem, IWarehouse } from '../../types'
import { getWarehouseById } from '../../redusers/initState'
import ActionButton from '../ActionButton'
import { connect } from 'react-redux'

interface OrdersListState {
    products:IProductItem[],
    warehouses:IWarehouse[],
    totalCount:number,
    price:string,
    removeItemFromCart:(id:string) => void,
    createOrder:() => void
}

const OrdersList = (props:OrdersListState) => {
    const { products, warehouses, removeItemFromCart, totalCount, price, createOrder } = props
    return (
        <div className="ordersList cart">
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
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Назва Товару</th>
                        <th>Аптека</th>
                        <th>Ціна</th>
                        {/* <th>Кількість</th> */}
                        <th></th>
                    </tr> 
                </thead>
                <tbody>
                    {products.map( (product, index) => {
                        const { name, warehouse_id, price, count, id } = product
                        const warehouse = getWarehouseById(warehouse_id, warehouses)
                        if (warehouse)
                            return (
                                <tr key={index}>
                                    <td>{name}</td>
                                    <td>{`№${warehouse_id} ${warehouse.name}`}</td>
                                    <td>{price.toFixed(2)}</td>
                                    {/* <td>{count}</td> */}
                                    <td>
                                        <ActionButton
                                            text="Delete"
                                            iconName=""
                                            iconSvgSrc=""
                                            classList={[]}
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

export default connect()(OrdersList)