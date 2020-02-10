import { 
  INIT_PRODUCTS_SEARCH,
  SET_PRODUCTS_SEARCH,
  SET_PRODUCTS_SEARCH_SUCCESS,
  SET_PRODUCTS_SEARCH_FAIL,
  SET_PRODUCTS_FAKE,
  SHOW_INFO_BLOCK,
  HIDE_INFO_BLOCK,
  ADD_PRODUCT_TO_CART,
  ADD_ITEM_TOP_CART,
  REMOVE_PRODUCT_FROM_CART,
  PLUS_PRODUCT_TO_CART,
  MINUS_PRODUCT_TO_CART,
  CLEAR_CART,
  CHANGE_REGISTER_FORM_FIELD,
  SUBMIT_REGISTER_FORM,
  CLEAN_REGISTER_FORM,
  CHANGE_LOGIN_FORM_FIELD,
  CLEAN_LOGIN_FORM,
  SET_USER_DATA,
  SET_USER_FULL_DATA,
  SET_PROMOTIONS,
  SET_NEWS,
  SET_NEWS_POST,
  SET_SETTINGS,
  SET_WAREHOUSES,
  VALIDATE_REGISTER_FORM,
  UNVALIDATE_REGISTER_FORM,
  SET_LOGIN_ERRORS,
  CHANGE_PRIVACYBLOCK_EDITABLE,
  CHANGE_GENERAL_EDITABLE,
  CHANGE_USER_FORM_FIELD,
  SET_SETTINGS_FORM,
  SET_HISTORY,
  CHANGE_SEARCH_KEY,
  CHANGE_FILTER,
  APPLY_DISCOUNT,
  CHANGE_PRODUCT_ITEM_QUANTITY
} from "../actions/types";

import {
  searchInitState,
  homePageState,
  defaultState,
  profilePageState,
  registerForm,
  loginForm,
  newsPage,
  newsPostPage,
  promotionsPage,
  profileSettingsState
} from './initState';

import { IHomePage, ISearchState, IProductItem, ICart, IProfilePage, SettingsState, IWarehouse } from "../types";
import { HistoryState } from "../components/ProfileComponents/History";


const extractCell = (listOfCell:{phone:string}[]) => {
  return listOfCell.map( (item) => {
    return item.phone
  })
}

export const DefaultReducer = (state = defaultState, action:any) => {

  if (action.type === ADD_ITEM_TOP_CART) {
    const { topNavBarState } = state
    return {
      ...state,
      topNavBarState: {
        ...topNavBarState,
        cartOrdersCount:topNavBarState.cartOrdersCount + action.payload
      }
    }
  }

  if (action.type === SET_USER_DATA) {
    const { topNavBarState } = state
    return {
      ...state,
      topNavBarState:{
        ...topNavBarState,
        isUserAuth:true,
        userName:action.payload
      }
    }
  }

  if (action.type === SET_SETTINGS) {
    const { topNavBarState, footerBlockState, settings } = state
    const { socialList } = footerBlockState
    const newState = {
      ...state,
      settings: {
        ...settings,
        facebook_link:action.payload.facebook_link,
        instagram_link:action.payload.instagram_link,
        youtube_link:action.payload.youtube_link
      },
      topNavBarState:{
        ...topNavBarState,
        phonesNumbers:extractCell(action.payload.contact_cell_top)
      },
      footerBlockState:{
        ...footerBlockState,
        contactsList:{
          title:"Контактна інформація",
          items:extractCell(action.payload.contact_cell_footer)
        },
        socialList:{
          ...socialList,
          items:[{
            iconName:"facebook",
            link:action.payload.facebook_link
          },{
            iconName:"instagram",
            link:action.payload.instagram_link
          },{
            iconName:"youtube",
            link:action.payload.youtube_link
          }]
        }
      }
    }
    return newState
  }

  if (action.type === SET_WAREHOUSES) {
    let warehouses:IWarehouse[] = []
    for (let warehouseData of action.payload) {
      warehouses.push({
        name:warehouseData.name,
        description:warehouseData.description,
        uuid:warehouseData.uuid,
        photoUrl:warehouseData.image,
        coordinates:undefined
      })
      
    }
    const newState = {
      ...state,
      warehouses
    }
    return newState
  }

  return state
}

export const NewsPostReducer = (state = newsPostPage, action:any) => {

  if (action.type === SET_PROMOTIONS) {
    const { promotions } = action.payload
    return {
      ...state,
      promotions
      }
  }

  if (action.type === SET_NEWS_POST) {
    return {
      ...state,
      newsPost:action.payload
    }
  }

  if (action.type === SET_NEWS) {
    return {
      ...state,
      otherNews:action.payload
    }
  }

  return state
}

export const PromotionsReducer = (state = promotionsPage, action:any) => {

  if (action.type === SET_PROMOTIONS) {
    const { promotions, promotions_big } = action.payload
    return {
      ...state,
      promotions,
      promotions_big
      }
  }

  return state
}

export const NewsReducer = (state = newsPage, action:any) => {

  if (action.type === SET_PROMOTIONS) {
    const { promotions } = action.payload
    return {
      ...state,
      promotions
      }
  }

  if (action.type === SET_NEWS) {
    return {
      ...state,
      newsList:action.payload
    }
  }

  return state
}

export const HomeReducer = (state = homePageState, action:any):IHomePage => {
  if (action.type === "VOID") {    
    return {
      ...state
    }
  }

  if (action.type === SET_PROMOTIONS) {
    const { promotions, promotions_big } = action.payload
    return {
      ...state,
      promotionsSmallBoxState:{
        promotionsSmallList:promotions,
        promotionsBigList:promotions_big
        }
      }
  }

  if (action.type === SET_NEWS) {
    const { newBlockState } = state
    return {
      ...state,
      newBlockState:{
        ...newBlockState,
        newList:action.payload
      }
    }
  }

  return state
}

export const ProfileReducer = (state = profilePageState, action:any):IProfilePage => {

  if (action.type === SET_USER_FULL_DATA) {
    return {
      ...state,
      userState:{
        ...action.payload
      }
    }
  }

  return state
}


export const SearchReducer = (state = searchInitState, action:any):ISearchState => {

  if (action.type === INIT_PRODUCTS_SEARCH) {    
    return {
      ...state
    }
  }
  if (action.type === APPLY_DISCOUNT) {
    const { cartState } = state
    return {
      ...state,
      cartState: {
        ...cartState,
        totalPriceDiscount:action.payload
      }
    }
  }

  if (action.type === CLEAR_CART) {
    localStorage.removeItem("cart")
    return {
      ...state,
      cartState:{
        products:[],
        totalCount:0,
        totalPrice:0,
        totalPriceDiscount:-1
      }
    }
  }

  if (action.type === SET_PRODUCTS_FAKE) {    
    const { searchFormState } = state
    const { message } = action.payload
    return {
      ...state,
      productsRequestState: {
        message:message,
        products:[{
          id: "1",
          index: 1,
          name: action.payload,
          producer:"noname",
          photo_url: "http://URL",
          warehouse_id: "9",
          price: 100,
          discount: 15,
          discount_type:1,
          remain: 102
        }],
        isRequestSended:true,
        isResponseRecieved:true,
        error:"",
        code:0,
        total:1
      },
      searchFormState: {
        ...searchFormState,
        searchFormSubmitted:false,
        searchInput:""
      },
    }
  }

  if (action.type === SET_PRODUCTS_SEARCH) {
    const { productsRequestState, searchFormState } = state

    return {
      ...state,
      productsRequestState: {
        ...productsRequestState,
        isRequestSended:true,
        isResponseRecieved:false,
      },
      searchFormState: {
        ...searchFormState,
        searchFormSubmitted:true
      },
    }
  }

  if (action.type === SET_PRODUCTS_SEARCH_SUCCESS) {
    const { searchFormState } = state
    const { message, code, data, total } = action.payload
    return {
      ...state,
      productsRequestState: {
        message:message,
        products:data,
        isRequestSended:true,
        isResponseRecieved:true,
        error:"",
        code:code,
        total:total
      },
      searchFormState: {
        ...searchFormState,
        searchFormSubmitted:false,
      },
    }
  }

  if (action.type === SET_PRODUCTS_SEARCH_FAIL) {
    const { searchFormState } = state
    const { message, code, error } = action.payload
    return {
      ...state,
      productsRequestState: {
        message:message,
        products:[],
        isRequestSended:true,
        isResponseRecieved:true,
        error:error,
        code:code,
        total:0
      },
      searchFormState: {
        ...searchFormState,
        searchFormSubmitted:false,
      },
    }
  }

  if (action.type === CHANGE_PRODUCT_ITEM_QUANTITY) {
    const { productId, warehouseId, increment, currentQuantity } = action.payload
    const { cartState, infoLayerState } = state
    let newQuantity = currentQuantity + increment
    let newProducts:IProductItem[] = []
    let newPrice:number = 0
    let newInfoLayer = {
      ...infoLayerState
    }

    for (let product of cartState.products) {
      if (product.id === productId && product.warehouse_id === warehouseId) {
        if (newQuantity <= product.remain && newQuantity > 0) {
        } else if (newQuantity > product.remain) {
          newInfoLayer.text = "Вибрана максимальна кількість товару, яка є в залишку"
          newInfoLayer.active = true
          newInfoLayer.timer = 3
          newQuantity = currentQuantity
        } else if (newQuantity <= 0) {
          newQuantity = currentQuantity
        }
        newProducts.push({
          ...product,
          count:newQuantity
        })
        
      } else {
        newProducts.push(product)
        newPrice += product.price * product.count
      }
    }

    const newCartState = {
      ...cartState,
      products:newProducts,
      totalPrice:newPrice
    }

    const cartStateJsonStr:string = JSON.stringify(newCartState)
    localStorage.setItem("cart", cartStateJsonStr)

    return {
      ...state,
      cartState: newCartState,
      infoLayerState:newInfoLayer
    }
    
  }

  if (action.type === SHOW_INFO_BLOCK) {
    const { infoLayerState } = state
    const { text, timer } = action.payload
    return {
      ...state,
      infoLayerState: {
        ...infoLayerState,
        text,
        timer,
        active:true
      }
    };
  }

  if (action.type === HIDE_INFO_BLOCK) {
    const { infoLayerState } = state
    return {
      ...state,
      infoLayerState: {
        ...infoLayerState,
        active:false
      }
    };
  }

  if (action.type === ADD_PRODUCT_TO_CART) {
    const { cartState, topNavBarState } = state

    let newProducts:IProductItem[] = []
    let totalPrice:number = 0
    let found:boolean = false

    for (let product of cartState.products) {
      if (product.id === action.payload.id &&
          product.warehouse_id === action.payload.warehouse_id) {
        newProducts.push({
          ...product,
          count: product.count + action.payload.count,
        })
        totalPrice += product.price + (action.payload.count * product.price)
        found = true
      } else {
        newProducts.push(product)
        totalPrice += product.price * product.count
      }
    }

    if (!found) {
      newProducts = newProducts.concat(action.payload)
      totalPrice += action.payload.price * action.payload.count
    }

    const newCartState:ICart = {
      products:newProducts,
      totalCount:newProducts.length,
      totalPrice:totalPrice,
      totalPriceDiscount:-1
    }

    const cartStateJsonStr:string = JSON.stringify(newCartState)
    localStorage.setItem("cart", cartStateJsonStr)
    
    return {
      ...state,
      cartState: newCartState,
      topNavBarState: {
        ...topNavBarState,
        cartOrdersCount:newProducts.length
      }
    }
  }

  if (action.type === PLUS_PRODUCT_TO_CART) {
    const { cartState, topNavBarState } = state

    let newProducts:IProductItem[] = []
    let totalPrice:number = 0

    for (let product of cartState.products) {
      if (product.id === action.payload) {
        newProducts.push({
          ...product,
          count:product.count + 1
        })
        totalPrice += (product.count + 1) * product.price
      } else {
        newProducts.push(product)
        totalPrice += product.count * product.price
      }
    }

    const newCartState:ICart = {
      products:newProducts,
      totalCount:newProducts.length,
      totalPrice:totalPrice,
      totalPriceDiscount:-1
    }

    const cartStateJsonStr:string = JSON.stringify(newCartState)
    localStorage.setItem("cart", cartStateJsonStr)

    return {
      ...state,
      cartState:newCartState,
      topNavBarState: {
        ...topNavBarState,
        cartOrdersCount:newProducts.length
      }
    }
  }

  if (action.type === MINUS_PRODUCT_TO_CART) {
    const { cartState, topNavBarState } = state

    let newProducts:IProductItem[] = []
    let totalPrice:number = 0

    for (let product of cartState.products) {
      if (product.id === action.payload) {
        if (product.count >= 1) {
          newProducts.push({
            ...product,
            count:product.count - 1
          })
          totalPrice += (product.count - 1) * product.price
        } else {
          newProducts.push(product)
          totalPrice += product.count * product.price
        }
      }
    }

    const newCartState:ICart = {
      products:newProducts,
      totalCount:newProducts.length,
      totalPrice:totalPrice,
      totalPriceDiscount:-1
    }

    const cartStateJsonStr:string = JSON.stringify(newCartState)
    localStorage.setItem("cart", cartStateJsonStr)

    return {
      ...state,
      cartState:newCartState,
      topNavBarState: {
        ...topNavBarState,
        cartOrdersCount:newProducts.length
      }
    }
  }

  if (action.type === REMOVE_PRODUCT_FROM_CART) {
    const { cartState, topNavBarState } = state

    let newProducts:IProductItem[] = []
    let totalPrice:number = 0

    for (let product of cartState.products) {
      if (product.id !== action.payload) {
        newProducts.push(product)
        totalPrice += product.count * product.price
      }
    }

    const newCartState:ICart = {
      products:newProducts,
      totalCount:newProducts.length,
      totalPrice:totalPrice,
      totalPriceDiscount:-1
    }

    const cartStateJsonStr:string = JSON.stringify(newCartState)
    localStorage.setItem("cart", cartStateJsonStr)

    return {
      ...state,
      cartState:newCartState,
      topNavBarState: {
        ...topNavBarState,
        cartOrdersCount:newProducts.length
      }
    }
  }

  if (action.type === CHANGE_SEARCH_KEY) {
    const { searchFormState } = state
    return {
      ...state,
      searchFormState:{
        ...searchFormState,
        searchInput:action.payload
      }
    }
  }
  if (action.type === CHANGE_FILTER) {
    const { searchFormState } = state
    return {
      ...state,
      searchFormState:{
        ...searchFormState,
        selectedFilter:action.payload
      }
    }
  }

  return state;
}

export const RegisterReducer = (state = registerForm, action:any) => {

  if (action.type === CHANGE_REGISTER_FORM_FIELD) {
    const { name, value } = action.payload
    let newForm:{[name:string]:string} = {}
    newForm[name] = value
    return {
      ...state,
      ...newForm
    }
  }

  if (action.type === SUBMIT_REGISTER_FORM) {
    return state
  }

  if (action.type === CLEAN_REGISTER_FORM) {
    return {
      ...registerForm
    }
  }

  if (action.type === VALIDATE_REGISTER_FORM) {
    return {
      ...state,
      validated:true,
    }
  }

  if (action.type === UNVALIDATE_REGISTER_FORM) {
    return {
      ...state,
      validated:false,
    }
  }

  return state
}

export const LoginReducer = (state = loginForm, action:any) => {

  if (action.type === CHANGE_LOGIN_FORM_FIELD) {
    const { name, value } = action.payload
    let newForm:{[name:string]:string} = {}
    newForm[name] = value
    return {
      ...state,
      ...newForm
    }
  }

  if (action.type === CLEAN_LOGIN_FORM) {
    return {
      ...loginForm
    }
  }

  if (action.type === SET_LOGIN_ERRORS) {
    return {
      ...state,
      errors:action.payload
    }
  }

  return state
}

export const ProfileSettingsReducer = (state = profileSettingsState, action:any):SettingsState => {

  if (action.type === CHANGE_GENERAL_EDITABLE) {
    return {
      ...state,
      generalBlockEditable:action.payload
    }
  }

  if (action.type === CHANGE_PRIVACYBLOCK_EDITABLE) {
    return {
      ...state,
      privacyBlockEditable:action.payload
    }
  }

  if (action.type === CHANGE_USER_FORM_FIELD) {
    const { name, value } = action.payload
    let newForm:{[name:string]:string} = {}
    newForm[name] = value
    return {
      ...state,
      ...newForm
    }
  }

  if (action.type === SET_SETTINGS_FORM) {
    return {
      ...state,
      userForm:action.payload
    }
  }

  return state
}

export const historyInitState:HistoryState = {
  orders:[]
}

export const HistoryReducer = (state:HistoryState = historyInitState, action:any) => {
  if (action.type === SET_HISTORY) {
    const orders = action.payload
    return {
      orders
    }
  }
  return state
}

export default DefaultReducer
