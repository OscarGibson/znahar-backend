import React, { Fragment } from 'react'
import { IProductItem, IWarehouse } from '../../types'
import { getWarehouseById } from '../../redusers/initState'
import ActionButton from '../ActionButton'
import { connect } from 'react-redux'
import { plusProductItem, minusProductItem } from '../../actions'
import { Form, Row, Col } from 'react-bootstrap'


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
                    <div className="settings-body">
                        <Form onSubmit={() => {}}>
                            <Form.Group as={Row} controlId="formPlaintextCell">
                                <Form.Label column sm="4">
                                Контактиний номер
                                </Form.Label>
                                <Col sm="8">
                                <Form.Control plaintext={false} name="cell" onChange={() => {}} readOnly={false} value={"0000"} />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                {discountBlock(totalPrice)}
            </Fragment>
        )
    }
}

const getPrice = (price:number, discount:number, type:number) => {
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

const OrdersList = (props:OrdersListState) => {
    const { products, warehouses, removeItemFromCart,
        totalCount, price, createOrder, totalPrice,
        plusProductItem, minusProductItem } = props
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
                        const { name, warehouse_id, price, count, id, discount, discount_type } = product
                        const warehouse = getWarehouseById(warehouse_id, warehouses)
                        if (warehouse)
                            return (
                                <tr key={`order-item-${index}`}>
                                    <td>{name}</td>
                                    <td>{`№${warehouse_id} ${warehouse.name}`}</td>
                                    <td>{getPrice(price, discount, discount_type)}</td>
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