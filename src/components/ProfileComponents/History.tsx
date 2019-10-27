import React, { Fragment } from 'react'
import { IWarehouse, IProduct } from '../../types'
import { connect } from 'react-redux'
import { getWarehouseById } from '../../redusers/initState'

export interface IProductHistoryItem extends IProduct {
    quantity:number,
}

export interface HistoryItemState {
    id:string,
    Products:IProductHistoryItem[],
    totalCount:number,
    price:string,
    warehouses:IWarehouse[],
    warehouse_id:number,
    total_price:number,
    created_at:string,
    maked:boolean
}

export interface HistoryState {
    orders:HistoryItemState[]
}

interface HistoryProps extends HistoryState {
    warehouses:IWarehouse[],
}

const getStatus = (maked:boolean) => {
    return 
}



const HistoryItem = (props:HistoryItemState) => {
    const { id, Products, warehouses, warehouse_id, total_price, price, created_at, maked } = props
    return (
        <Fragment>
            <div className="info">
                <span className="text">Статус: {maked ? "Готово" : "В обробці"}</span>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Назва Товару</th>
                        <th>Аптека</th>
                        <th>Ціна</th>
                        <th>Кількість</th>
                    </tr> 
                </thead>
                <tbody>
                    {Products.map( (product, index) => {
                        const { name, price, quantity, id } = product
                        const warehouse = getWarehouseById(`${warehouse_id}`, warehouses)
                        if (warehouse)
                            return (
                                <tr key={`history-item-${id}-${index}`}>
                                    <td>{name}</td>
                                    <td>{`№${warehouse_id} ${warehouse.name}`}</td>
                                    <td>{price.toFixed(2)}</td>
                                    <td>{quantity}</td>
                                </tr>
                            )
                    })}
                    <tr key={`history-item-${id}-total`}>
                        <td>Всього</td>
                        <td></td>
                        <td>{price}</td>
                        <td></td>
                    </tr>
                    <tr key={`history-item-${id}-totalDiscount`}>
                        <td>Всього зі знижкою</td>
                        <td></td>
                        <td>{total_price.toFixed(2)}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    )
}

const mapStateToProps = (reducers:any):HistoryState => {
    const { HistoryReducer } = reducers
    return {
        ...HistoryReducer
    }
}

const History = (props:HistoryProps) => {
    const { orders, warehouses } = props
    console.log("orders", orders)
    return (
        <div className="ordersList cart">
            <div className="info">
                <span className="text">Історія Бронювань</span>
            </div>
            {orders.map( (order, index) => {
                return (
                    <HistoryItem key={`history-item-${index}`} {...order} warehouses={warehouses}/>
                )
            })}
        </div> 
    )
}


export default connect(mapStateToProps)(History)