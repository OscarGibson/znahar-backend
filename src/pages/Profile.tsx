import React from 'react'
import { connect } from 'react-redux'
import MainMenuSimple from '../components/MainMenuSimple'
import { IProfilePage, IInfoLayer, IWarehouse, IUser, IUserForm, ICart } from '../types'
import { getWarehouseById } from '../redusers/initState'
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
import { ORDERS_URL, GET_USER_URL, GET_HISTORY_URL, CHECK_DISCOUNT_URL } from '../constants'
import { Switch, Route } from 'react-router'
import ProfileComponents from '../components/ProfileComponents'
import { ReplaceProps, BsPrefixProps } from 'react-bootstrap/helpers';
import { FormControlProps } from 'react-bootstrap';
import { HistoryItemState } from '../components/ProfileComponents/History'
import ImageUploader from 'react-images-upload'

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

const renderUserPhoto = (photoUrl:string) => {
    if (photoUrl)
        return (
            <img src={photoUrl}/>
        )
    else
        return (
            <img src="/static/images/user.png"/>
        )
}

class Profile extends React.Component<IProfilePageExtend, IProfilePage> {
    constructor(props:IProfilePageExtend, state:IProfilePage) {
        super(props, state)

        this.removeItemFromCart = this.removeItemFromCart.bind(this)
        this.createOrder = this.createOrder.bind(this)
        this.sendFinishMessage = this.sendFinishMessage.bind(this)
        this.changeUserFormField = this.changeUserFormField.bind(this)
        this.submitUserForm = this.submitUserForm.bind(this)
        this.submitPrivacyForm = this.submitPrivacyForm.bind(this)
        this.changeEditable = this.changeEditable.bind(this)
        this.getOrdersHistory = this.getOrdersHistory.bind(this)
        this.checkDiscount = this.checkDiscount.bind(this)
        this.normalizeOrdersList = this.normalizeOrdersList.bind(this)
        this.onDropImage = this.onDropImage.bind(this)
    }

    onDropImage(pictures:File[]) {
        const photo = pictures[pictures.length - 1]
        const accessToken = localStorage.getItem("accessToken") || ""
        let data = new FormData()
        data.append('photo', photo, photo.name);
        axios.patch(GET_USER_URL, data,{
            headers: {Authorization: "Bearer " + accessToken, 'content-type': 'multipart/form-data'}
        })
        .then((response) => {
            if (response.status === 200) {
                const { setUserFullData } = this.props
                setUserFullData(response.data)
            }
        })
        .catch((_error) => {
            window.location.href = "/login"
        })
        .finally(() => {  
        })
    }

    getOrdersHistory(accessToken:string) {
        const { setHistory } = this.props
        axios.get(GET_HISTORY_URL, {
            headers: {Authorization: "Bearer " + accessToken}
        })
        .then((response) => {
            if (response.status === 200) {
                const orders = response.data.data
                setHistory(orders)
            }
        })
        .catch((error) => {
            console.log("ERROR", error)
        })
        .finally(() => {  
        })
    }

    changeEditable(isEditable:boolean, name:string) {
        let changeAction
        if (name === "privacy")
            changeAction = this.props.setPrivacyEditable
        else
            changeAction = this.props.setGeneralEditable

        changeAction(isEditable)
    }

    submitUserForm(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const { setGeneralEditable, setSettingsForm, settings } = this.props
        const { userForm } = settings
        // send request
        setGeneralEditable(false)
        setSettingsForm({...userForm, password:"******"})
    }

    submitPrivacyForm(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const { setPrivacyEditable, setSettingsForm, settings } = this.props
        const { userForm } = settings
        // send request
        setPrivacyEditable(false)
        setSettingsForm({...userForm, password:"******"})
    }

    changeUserFormField(event: React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>>) {
        const { setProfileFormField } = this.props
        const form = event.currentTarget
        setProfileFormField({
            name:form.name || "",
            value:form.value || ""
        })
    }

    componentDidMount() {

        const accessToken = localStorage.getItem("accessToken") || ""
        axios.get(GET_USER_URL, {
            headers: {Authorization: "Bearer " + accessToken}
        })
        .then((response) => {
            if (response.status === 200) {
                const { setUserFullData, setSettingsForm } = this.props
                setUserFullData(response.data)
                setSettingsForm({...response.data, password:"******"})
            }
        })
        .catch((_error) => {
            window.location.href = "/login"
        })
        .finally(() => {

        })

        const { cartState } = this.props

        this.getOrdersHistory(accessToken)
        this.checkDiscount(this.normalizeOrdersList(cartState))
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

    normalizeOrdersList(cartState:ICart) {
        let orders:{[key:string]:IOrderRequest} = {}

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
                    }]
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
        const accessToken = localStorage.getItem("accessToken")
        axios.post(CHECK_DISCOUNT_URL, {
            orders:finalOrders
        }, {
            headers: {Authorization: "Bearer " + accessToken}
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
        if (userState.cell === "") {
            showInfoLayer({
                text:"У вас не вказаний номер телефону. Щоб продовжити - перейдіть на сторінку налаштувань",
                timer:3,
            })
        }

        const finalOrders = this.normalizeOrdersList(cartState)

        const accessToken = localStorage.getItem("accessToken")


        axios.post(ORDERS_URL, {
            orders:finalOrders
        }, {
            headers: {Authorization: "Bearer " + accessToken}
        })
        .then((response) => {
            if (response.status === 201) {
                showInfoLayer({
                    text:"Вітаємо, ви успішно здійснили бронювання, найближчиим часом наш працівник зателефонує вам для уточнення деталей",
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



    render() {
        const { mainMenuSimpleState, userState, cartState, infoLayerState, warehouses, settings } = this.props
        const { products, totalCount, totalPriceDiscount, totalPrice } = cartState

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
                <div className="body standart-container row">
                    <div className="leftSidebar col-md-3 col-sm-12">
                        <div className="userPhoto">
                            {renderUserPhoto(userState.photo)}
                            <ImageUploader
                                buttonText='Завантажити зображення'
                                onChange={this.onDropImage}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                label=""
                                withIcon={false}
                            />
                        </div>
                        <Switch>
                            <Route path="/profile/orders" exact component={() =>
                                <ProfileComponents.ProfileMenu currentPageName="orders"/>
                            }/>
                            <Route path="/profile/discounts" exact component={() =>
                                <ProfileComponents.ProfileMenu currentPageName="discounts"/>
                            }/>
                            <Route path="/profile/history" exact component={() =>
                                <ProfileComponents.ProfileMenu currentPageName="history"/>
                            }/>
                            <Route path="/profile/settings" exact component={() =>
                                <ProfileComponents.ProfileMenu currentPageName="settings"/>
                            }/>
                        </Switch>
                    </div>
                    <div className="rightSidebar col-md-9 col-sm-12">
                        <div className="userBio">
                            <h1 className="userName">{userState.fname} {userState.lname}</h1>
                            <p className="userEmail">{userState.email}</p>
                            <p className="userCell">{userState.cell}</p>
                        </div>
                        <div className="cartOrders">
                            <Switch>
                                <Route path="/profile/orders" exact component={() =>
                                    <ProfileComponents.OrdersList
                                        products={products}
                                        warehouses={warehouses}
                                        totalCount={totalCount}
                                        price={totalPrice.toFixed(2)}
                                        removeItemFromCart={this.removeItemFromCart}
                                        createOrder={this.createOrder}
                                        totalPrice={totalPriceDiscount}
                                    />
                                }/>
                                <Route path="/profile/discounts" exact component={() =>
                                    <ProfileComponents.Discounts/>
                                }/>
                                <Route path="/profile/history" exact component={() =>
                                    <ProfileComponents.History warehouses={warehouses}/>
                                }/>
                                <Route path="/profile/settings" exact component={() =>
                                    <ProfileComponents.Settings
                                        userForm={settings.userForm}
                                        generalBlockEditable={settings.generalBlockEditable}
                                        privacyBlockEditable={settings.privacyBlockEditable}
                                        changeUserFormField={this.changeUserFormField}
                                        submitUserForm={this.submitUserForm}
                                        submitPrivacyForm={this.submitPrivacyForm}
                                        changeEditable={this.changeEditable}
                                    />
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