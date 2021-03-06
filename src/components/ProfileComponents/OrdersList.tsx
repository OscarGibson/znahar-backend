import React, { Fragment } from 'react'
import { IProductItem, IWarehouse, IUser } from '../../types'
import { getWarehouseById } from '../../redusers/initState'
import ActionButton from '../ActionButton'
import { connect } from 'react-redux'
import { plusProductItem, minusProductItem, setUserFullData } from '../../actions'


interface OrdersListState {
    products:IProductItem[],
    warehouses:IWarehouse[],
    totalCount:number,
    price:string,
    totalPrice:number,
    userState:IUser,
    removeItemFromCart:(product:IProductItem) => void,
    createOrder:() => void,
    plusProductItem:(productId:string, warehouseId:string, currentQuantity:number) => void,
    minusProductItem:(productId:string, warehouseId:string, currentQuantity:number) => void,
    setUserFullData:(userState:IUser) => void
    checkDiscount:() => void
}

const discountBlock = (totalPrice:number, checkDiscount:() => void) => {
    let price = totalPrice !== -1 ? `Зі знижкою ${totalPrice.toFixed(2)} грн` : ""
    return (
        <div className="info">
            <span className="text">{price}</span>
            <ActionButton
                text={"Порахувати знижку"}
                action={checkDiscount}
                classList={["default-button", "button"]}
                iconName=""
                iconSvgSrc=""
            />
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
        },
        setUserFullData:(userState:IUser) => {dispatch(setUserFullData(userState))}
    }
}

const RenderInfoBlock = (
        props:{totalCount:number,
        createOrder:() => void,
        price:string,
        totalPrice:number,
        checkDiscount:() => void}
    ) => {
        const { totalCount, createOrder, price,  totalPrice, checkDiscount } = props
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
                {discountBlock(totalPrice, checkDiscount)}
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
        plusProductItem, minusProductItem, userState, checkDiscount } = props
        const { cell } = userState

    return (
        <div className="ordersList cart">
            <RenderInfoBlock 
                totalCount={totalCount}
                createOrder={createOrder}
                price={price}
                totalPrice={totalPrice}
                checkDiscount={checkDiscount}
            />
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
                                        <div className="ActionButton delete-icon" onClick={() => {removeItemFromCart(product)}}>
                                            <img key="delete-icon-img" src="/static/svg/huge_bin.svg" alt="" />
                                        </div>
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