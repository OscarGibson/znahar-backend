import React from 'react'
import { connect } from 'react-redux'
import MainMenuSimple from '../components/MainMenuSimple'
import { IProfilePage, IInfoLayer, IWarehouse, IUser } from '../types'
import ActionButton from '../components/ActionButton'
import { getWarehouseById } from '../redusers/initState'
import axios from 'axios'
import {
    removeProductFromCart,
    plusProductToCart,
    minusProductFromCart,
    showInfoLayer,
    clearCart,
    setUserFullData
} from '../actions'
import InfoLayer from '../components/InfoLayer'
import Breadcrumbp from '../components/Breadcrumbp'
import { ORDERS_URL, GET_USER_URL } from '../constants'

interface IProductData {
    id:string,
    quantity:number
}

interface IOrderRequest {
    warehouse_id:string,
    products:IProductData[]
}


const mapDispatchToProps = (dispatch:any) => {
    return {
        removeProductFromCart: (payload:string) => {dispatch(removeProductFromCart(payload))},
        plusProductToCart: (payload:number) => {dispatch(plusProductToCart(payload))},
        minusProductFromCart: (payload:number) => {dispatch(minusProductFromCart(payload))},
        showInfoLayer: (payload:IInfoLayer) => {dispatch(showInfoLayer(payload))},
        clearCart: () => {dispatch(clearCart())},
        setUserFullData: (payload:IUser) => {dispatch(setUserFullData(payload))}
    }
}

const mapStateToProps = (reducer:any) => {
    const { ProfileReducer, SearchReducer } = reducer
    console.log("STATE TO PROPS", ProfileReducer)
    return {
        ...ProfileReducer,
        cartState:SearchReducer.cartState,
        topNavBarState:SearchReducer.topNavBarState,
        infoLayerState:SearchReducer.infoLayerState
    }
}

const renderUserPhoto = (photoUrl:string) => {
    if (photoUrl)
        return (
            <img src={photoUrl} alt="user photo"/>
        )
    else
        return (
            <img src="/static/images/user.png" alt="user photo"/>
        )
}

class Profile extends React.Component<IProfilePage, IProfilePage> {
    constructor(props:IProfilePage, state:IProfilePage) {
        super(props, state)

        this.removeItemFromCart = this.removeItemFromCart.bind(this)
        this.createOrder = this.createOrder.bind(this)
        this.sendFinishMessage = this.sendFinishMessage.bind(this)
    }

    componentDidMount() {
        const accessToken = localStorage.getItem("accessToken")
        axios.get(GET_USER_URL, {
            headers: {Authorization: "Bearer " + accessToken}
        })
        .then((response) => {
            if (response.status === 200) {
                const { setUserFullData } = this.props
                setUserFullData(response.data)
            }
        })
        .catch((error) => {
            console.log("ERROR", error)
            window.location.href = "/login"
        })
        .finally(() => {

        })
    }

    sendFinishMessage(warehousesError:string[]) {
        const { showInfoLayer } = this.props
        let text:string = "Деякі товари з вашого списку не вдалось забронювати: \n"

        if (warehousesError.length === 0) {
            showInfoLayer({
                text:"Вітаємо, ви успішно здійснили бронювання, найблищим часом наш працівник зателефонує вам для уточнення деталей",
                timer:2,
            })
        } else {
            let warehouse:IWarehouse
            for (let warehouseId of warehousesError) {
                warehouse = getWarehouseById(warehouseId)
                text += `№${warehouseId} ${warehouse.address}`
            }
            showInfoLayer({
                text,
                timer:2,
            })
        }
        const { clearCart } = this.props
        clearCart()   
    }

    removeItemFromCart(itemId:string) {
        const { removeProductFromCart } = this.props
        removeProductFromCart(itemId)
    }

    createOrder() {
        const { cartState } = this.props

        let orders:{[key:string]:IOrderRequest} = {}
        let ordersLength:number = 0

        for (let productItem of cartState.products) {
            if (orders[productItem.warehouse_id]) {
                orders[productItem.warehouse_id].products.push({
                    id:productItem.id,
                    quantity:productItem.count
                })
                ordersLength++
            } else {
                orders[productItem.warehouse_id] = {
                    warehouse_id:productItem.warehouse_id,
                    products:[{
                        id:productItem.id,
                        quantity:productItem.count
                    }]
                }
                ordersLength++
            }
        }

        let finalOrders:IOrderRequest[] = []

        for (let warehouseId in orders) {
            finalOrders.push(orders[warehouseId])
        }

        const accessToken = localStorage.getItem("accessToken")
        const { showInfoLayer } = this.props

        console.log("ORDERS: ", finalOrders)

        axios.post(ORDERS_URL, {
            orders:finalOrders
        }, {
            headers: {Authorization: "Bearer " + accessToken}
        })
        .then((response) => {
            if (response.status === 201) {
                showInfoLayer({
                    text:"Вітаємо, ви успішно здійснили бронювання, найблищим часом наш працівник зателефонує вам для уточнення деталей",
                    timer:2,
                })
            } else {
                showInfoLayer({
                    text:"Деякі товари з вашого списку не вдалось забронювати",
                    timer:2,
                })
            }
            console.log(response)
        })
        .catch((error) => {
            console.log("ERROR", error)
            showInfoLayer({
                text:"Помилка системи. Приносимо вибачення за тимчасові незручності",
                timer:2,
            })
        })
        .finally(() => {
            const { clearCart } = this.props
            clearCart()  
        })

    }



    render() {
        const { mainMenuSimpleState, userState, cartState, infoLayerState } = this.props
        const { products, totalCount, totalPriceDiscount, totalPrice } = cartState

        let price:string

        if (totalPriceDiscount === -1)
            price = totalPrice.toFixed(2)
        else
            price = totalPriceDiscount.toFixed(2)

        return (
            <div className="Profile">
                <MainMenuSimple { ...mainMenuSimpleState }/>
                <div className="header">
                    <div className="content standart-container">
                        <h1 className="title">Мій кабінет</h1>
                        <Breadcrumbp
                            pages={[{
                                name:"Головна",
                                url:"/"
                            },{
                                name:"Мій кабінет",
                                url:null
                            }]}
                        />
                    </div>
                </div>
                <div className="body standart-container">
                    <div className="leftSidebar">
                        <div className="userPhoto">
                            {renderUserPhoto(userState.photoUrl)}
                        </div>
                        <div className="menu">
                            {/* <ul>
                                <li>Мої Бронювання</li>
                                <li>Ваучер на знижку</li>
                                <li>Налаштування</li>
                                <li>Історія Бронювань</li>
                                <hr/>
                                <li>Вихід</li>
                            </ul> */}
                        </div>
                    </div>
                    <div className="rightSidebar">
                        <div className="userBio">
                            <h1 className="userName">{userState.fname} {userState.lname}</h1>
                            <p className="userEmail">{userState.email}</p>
                            <p className="userCell">{userState.cell}</p>
                        </div>
                        <div className="cartOrders">
                            <div className="info">
                                <span className="text">{`Мої Бронювання (${totalCount}од. / ${price} грн)`}</span>
                                <ActionButton
                                    text={"Підтвердити"}
                                    action={this.createOrder}
                                    classList={["default-button", "button"]}
                                    iconName=""
                                    iconSvgSrc=""
                                />
                            </div>

                            <div className="ordersList cart">
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
                                            const warehouse = getWarehouseById(warehouse_id)
                                            return (
                                                <tr key={index}>
                                                    <td>{name}</td>
                                                    <td>{`№${warehouse_id} ${warehouse.address}`}</td>
                                                    <td>{price}</td>
                                                    <td>{count}</td>
                                                    <td>
                                                        <ActionButton
                                                            text="Delete"
                                                            iconName=""
                                                            iconSvgSrc=""
                                                            classList={[]}
                                                            action={() => {this.removeItemFromCart(id)}}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* <div className="info">
                                <span className="text">Мої Бронювання (2457.88 грн)</span>
                                <ActionButton
                                    text={"Відмінити"}
                                    action={() => {}}
                                    classList={["default-button", "button"]}
                                    iconName=""
                                    iconSvgSrc=""
                                />
                            </div> */}

                            {/* <div className="ordersList">
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
                                        <tr>
                                            <td>Стрепсілс б/цукру лимон льодяники №16</td>
                                            <td>№12, Пасічна, 70</td>
                                            <td>69.45</td>
                                            <td>1</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Стрепсілс б/цукру лимон льодяники №16</td>
                                            <td>№12, Пасічна, 70</td>
                                            <td>69.45</td>
                                            <td>1</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Стрепсілс б/цукру лимон льодяники №16</td>
                                            <td>№12, Пасічна, 70</td>
                                            <td>69.45</td>
                                            <td>1</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> */}
                        </div>
                    </div>
                </div>
                <InfoLayer {...infoLayerState}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)