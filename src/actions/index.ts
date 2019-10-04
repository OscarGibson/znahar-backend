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
  CLEAN_REGISTER_FORM,
  CHANGE_LOGIN_FORM_FIELD,
  CLEAN_LOGIN_FORM,
  SET_USER_DATA,
  SET_USER_FULL_DATA,
  SET_PROMOTIONS,
  SET_NEWS,
  SET_NEWS_POST
} from "./types";
import { IInfoLayer, IProductItem, IUser, IPromotionBigItem, IPromotionItem, INewsItem, INewsPost } from "../types";

export function initProductsInSearch(payload:any) {
  return { type: INIT_PRODUCTS_SEARCH, payload };
}

export function getProductsRequestSended() {
  return { type: SET_PRODUCTS_SEARCH, payload: {} };
}

export function setProductsSuccess(products:any[]) {
  return { type: SET_PRODUCTS_SEARCH_SUCCESS, payload: products };
}

export function setProductsFail() {
  return { type: SET_PRODUCTS_SEARCH_FAIL, payload: {} };
}

export function getProductsFake(searchKey:string) {
  return { type: SET_PRODUCTS_FAKE, payload: searchKey };
}

export const showInfoLayer = (payload:IInfoLayer) => {
  return { type:SHOW_INFO_BLOCK, payload}
}

export const hideInfoLayer = () => {
  return { type:HIDE_INFO_BLOCK, payload:{}}
}

export const addProductToCart = (payload:IProductItem) => {
  return { type:ADD_PRODUCT_TO_CART, payload }
}

export const clearCart = () => {
  return { type:CLEAR_CART, payload:{} }
}

export const removeProductFromCart = (payload:string) => {
  return { type:REMOVE_PRODUCT_FROM_CART, payload }
}

export const plusProductToCart = (payload:number) => {
  return { type:PLUS_PRODUCT_TO_CART, payload }
}

export const minusProductFromCart = (payload:number) => {
  return { type:MINUS_PRODUCT_TO_CART, payload }
}

export const addItemTopCart = (payload:number) => {
  return { type:ADD_ITEM_TOP_CART, payload }
}

export const changeRegisterFormField = (payload:{name:string, value:string}) => {
  return { type:CHANGE_REGISTER_FORM_FIELD, payload}
}

export const cleanRegisterForm = () => {
  return { type:CLEAN_REGISTER_FORM, payload:{}}
}

export const changeLoginFormField = (payload:{name:string, value:string}) => {
  return { type:CHANGE_LOGIN_FORM_FIELD, payload}
}

export const cleanLoginForm = () => {
  return { type:CLEAN_LOGIN_FORM, payload:{}}
}

export const setUserData = (payload:string) => {
  return { type:SET_USER_DATA, payload}
}

export const setUserFullData = (payload:IUser) => {
  return { type:SET_USER_FULL_DATA, payload}
}

export const setPromotions = (payload:{promotions:IPromotionItem[], promotions_big:IPromotionBigItem[]}) => {
  return { type:SET_PROMOTIONS, payload}
}

export const setNews = (payload:INewsItem[]) => {
  return { type:SET_NEWS, payload}
}

export const setNewsPost = (payload:INewsPost) => {
  return { type:SET_NEWS_POST, payload}
}