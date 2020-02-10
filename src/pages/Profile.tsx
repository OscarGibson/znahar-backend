import React from 'react'
import { connect } from 'react-redux'
import MainMenuSimple from '../components/MainMenuSimple'
import { IProfilePage, IInfoLayer, IWarehouse, IUser, IUserForm, ICart } from '../types'
import { getWarehouseById, userInitState } from '../redusers/initState'
import axios from 'axios'
import {
    removeProductFromCart,
    plusProductToCart,
    minusProductFromCart,
    showInfoLayer,
    clearCart,
    setUserFullData,
    setPrivacyEditable,
    setGeneralEditable,
    setProfileFormField,
    setSettingsForm,
    setHistory,
    applyDiscount
} from '../actions'
import InfoLayer from '../components/InfoLayer'
import Breadcrumbp from '../components/Breadcrumbp'
import { ORDERS_URL, CHECK_DISCOUNT_URL } from '../constants'
import { Switch, Route } from 'react-router'
import ProfileComponents from '../components/ProfileComponents'
import { HistoryItemState } from '../components/ProfileComponents/History'
import { Form } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import PhoneInput from "react-phone-number-input"


interface IProductData {
    id:string,
    quantity:number
}

interface IOrderRequest {
    warehouse_id:string,
    products:IProductData[]
}

interface IProfilePageExtend extends IProfilePage {
    applyDiscount:(discount:number) => void
}


const mapDispatchToProps = (dispatch:any) => {
    return {
        removeProductFromCart: (payload:string) => {dispatch(removeProductFromCart(payload))},
        plusProductToCart: (payload:number) => {dispatch(plusProductToCart(payload))},
        minusProductFromCart: (payload:number) => {dispatch(minusProductFromCart(payload))},
        showInfoLayer: (payload:IInfoLayer) => {dispatch(showInfoLayer(payload))},
        clearCart: () => {dispatch(clearCart())},
        setUserFullData: (payload:IUser) => {dispatch(setUserFullData(payload))},
        setPrivacyEditable:(isEditable:boolean) => {dispatch(setPrivacyEditable(isEditable))},
        setGeneralEditable:(isEditable:boolean) => {dispatch(setGeneralEditable(isEditable))},
        setProfileFormField:(payload:{name:string, value:string}) => {dispatch(setProfileFormField(payload))},
        setSettingsForm:(payload:IUserForm) => {dispatch(setSettingsForm(payload))},
        setHistory:(orders:HistoryItemState[]) => {dispatch(setHistory(orders))},
        applyDiscount:(discount:number) => {dispatch(applyDiscount(discount))}
    }
}

const mapStateToProps = (reducer:any) => {
    const { ProfileReducer, SearchReducer, DefaultReducer, ProfileSettingsReducer } = reducer
    return {
        ...ProfileReducer,
        cartState:SearchReducer.cartState,
        topNavBarState:SearchReducer.topNavBarState,
        infoLayerState:SearchReducer.infoLayerState,
        warehouses:DefaultReducer.warehouses,
        settings:ProfileSettingsReducer
    }
}

class Profile extends React.Component<IProfilePageExtend, IProfilePage> {
    constructor(props:IProfilePageExtend, state:IProfilePage) {
        super(props, state)

        this.removeItemFromCart = this.removeItemFromCart.bind(this)
        this.createOrder = this.createOrder.bind(this)
        this.sendFinishMessage = this.sendFinishMessage.bind(this)
        this.checkDiscount = this.checkDiscount.bind(this)
        this.normalizeOrdersList = this.normalizeOrdersList.bind(this)
        this.changeCellPhone = this.changeCellPhone.bind(this)
    }

    componentDidMount() {
        const { cartState, userState } = this.props
        this.checkDiscount(this.normalizeOrdersList(cartState, userState.cell))
    }
    

    sendFinishMessage(warehousesError:string[]) {
        const { showInfoLayer, warehouses } = this.props
        let text:string = "Деякі товари з вашого списку не вдалось забронювати: \n"

        if (warehousesError.length === 0) {
            showInfoLayer({
                text:"Вітаємо, ви успішно здійснили бронювання, найблищим часом наш працівник зателефонує вам для уточнення деталей",
                timer:2,
            })
        } else {
            let warehouse:IWarehouse
            for (let warehouseId of warehousesError) {
                warehouse = getWarehouseById(warehouseId, warehouses)
                text += `№${warehouseId} ${warehouse.name}`
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

    normalizeOrdersList(cartState:ICart, cell:string) {
        let orders:any = {}

        for (let productItem of cartState.products) {
            if (orders[productItem.warehouse_id]) {
                orders[productItem.warehouse_id].products.push({
                    id:productItem.id,
                    quantity:productItem.count
                })
            } else {
                orders[productItem.warehouse_id] = {
                    warehouse_id:productItem.warehouse_id,
                    products:[{
                        id:productItem.id,
                        quantity:productItem.count
                    }],
                    phonenumber:cell
                }
            }
        }

        let finalOrders:IOrderRequest[] = []

        for (let warehouseId in orders) {
            finalOrders.push(orders[warehouseId])
        }
        return finalOrders
    }

    checkDiscount(finalOrders:IOrderRequest[]) {
        axios.post(CHECK_DISCOUNT_URL, {
            orders:finalOrders
        })
        .then((response) => {
            if (response.status === 200) {
                const { total_price, price } = response.data.data
                const { applyDiscount } = this.props
                if (price !== total_price)
                    applyDiscount(total_price)
            } else {
                //
            }
        })
        .catch((error) => {
            //
        })
        .finally(() => {
            // 
        })
    }

    createOrder() {
        const { cartState, userState, showInfoLayer } = this.props
        const { cell } = userState

        if (!cell || cell === userInitState.cell) {
            showInfoLayer({
                text:"У вас не вказаний номер телефону",
                timer:3,
            })
            return false
        } else if (cell.length < 10) {
            showInfoLayer({
                text:"Вказано некоректний номер телефону",
                timer:3,
            })
        }

        const finalOrders = this.normalizeOrdersList(cartState, cell)

        axios.post(ORDERS_URL, {
            orders:finalOrders
        })
        .then((response) => {
            if (response.status === 201) {
                showInfoLayer({
                    text:"Вітаємо, ви успішно здійснили бронювання, очікуйте СМС",
                    timer:2,
                })
            } else {
                showInfoLayer({
                    text:"Деякі товари з вашого списку не вдалось забронювати",
                    timer:2,
                })
            }
        })
        .catch((error) => {
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

    changeCellPhone(cell: string) {
        const { setUserFullData } = this.props
        setUserFullData({
            ...userInitState,
            cell
        })
    }



    render() {
        const { mainMenuSimpleState, userState, cartState, infoLayerState, warehouses } = this.props
        const { products, totalCount, totalPriceDiscount, totalPrice } = cartState
        const { cell } = userState

        return (
            <div className="Profile">
                <MainMenuSimple { ...mainMenuSimpleState }/>
                <div className="header">
                    <div className="content standart-container">
                        <h1 className="title">Замовлення</h1>
                        <Breadcrumbp
                            pages={[{
                                name:"Головна",
                                url:"/"
                            },{
                                name:"Замовлення",
                                url:null
                            }]}
                        />
                    </div>
                </div>
                <div className="body standart-container row">
                    <div className="rightSidebar col-md-9 col-sm-12">
                        <div className="cartOrders">
                        <div className="settings-body">
                            <Form onSubmit={() => {}}>
                                <Form.Group as={Row} controlId="formPlaintextCell">
                                    <Form.Label column sm="4">
                                    Контактиний номер
                                    </Form.Label>
                                    <Col sm="8">
                                    <PhoneInput
                                        international={false}
                                        placeholder="+380XX XXX XX XX"
                                        value={cell}
                                        onChange={this.changeCellPhone}
                                        limitMaxLength
                                        maxLength={16}
                                    />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                            <Switch>
                                <Route path="/profile/orders" exact component={() =>
                                    <ProfileComponents.OrdersList
                                        products={products}
                                        warehouses={warehouses}
                                        totalCount={totalCount}
                                        userState={userState}
                                        price={totalPrice.toFixed(2)}
                                        removeItemFromCart={this.removeItemFromCart}
                                        createOrder={this.createOrder}
                                        totalPrice={totalPriceDiscount}
                                    />
                                }/>
                                <Route path="/profile/settings" exact component={() =>
                                    <ProfileComponents.ProfileMenu currentPageName="settings"/>
                                }/>
                            </Switch>
                        </div>
                    </div>
                </div>
                <InfoLayer {...infoLayerState}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)