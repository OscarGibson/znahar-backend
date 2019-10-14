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
  SET_LOGIN_ERRORS
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
  promotionsPage
} from './initState';

import { IHomePage, ISearchState, IProductItem, ICart, IProfilePage } from "../types";


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
    const { topNavBarState, footerBlockState } = state
    const { socialList } = footerBlockState
    const newState = {
      ...state,
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
    const newState = {
      ...state,
      warehouses:action.payload
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
    const { message, code, data, total } = action.payload
    return {
      ...state,
      productsRequestState: {
        message:message,
        products:[{
          id: "1",
          index: 1,
          name: action.payload,
          photo_url: "http://URL",
          warehouse_id: "9",
          price: 100,
          discount: 15,
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
        searchFormSubmitted:true,
        searchInput:"",
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
        searchInput:""
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
        searchInput:""
      },
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

    const newState = {
      ...state,
      cartState: newCartState,
      topNavBarState: {
        ...topNavBarState,
        cartOrdersCount:newProducts.length
      }
    }
    return newState
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

export default DefaultReducer
