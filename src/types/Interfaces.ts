import { string } from "prop-types";
import SubscribeBlock from "../components/SubscribeBlock";
import { ReactNode } from "react";

export interface IAction {
    ():{type:string,action:any}
}
export interface IActionPayload {
    (payload:any):{type:string,action:any}
}
export interface IHandle {
    ():void
}
export interface IHandleSearch {
    (searchKey:string, selectedFilter?:string):void
}
export interface IHandleActionButton {
    (e:any):void
}


export interface IProduct {
    id:string,
    index:number,
    name:string,
    warehouse_id:string,
    photo_url:string,
    price:number,
    discount:number,
    remain:number
}

export interface IGetProductsRequest {
    message:string,
    error:string,
    code:number,
    products:IProduct[],
    total:number,
    isRequestSended:boolean,
    isResponseRecieved:boolean
}

export interface ISearchForm {
    searchInput:string,
    searchFormSubmitted:boolean,
    action:IHandleSearch
}

export interface ITopNavBarState {
    phonesNumbers:string[],
    isUserAuth:boolean,
    userName:string,
    cartOrdersCount:number,
    setUserData:(payload:string) => void
}

export interface IMenuItem {
    name:string,
    url:string
}

export interface IMainMenuData {
    items:IMenuItem[],
    logoUrl:string
}

export interface IBigSearchBlock {
    searchFormState:ISearchForm,
}

export interface IActionButton {
    iconName:string,
    iconSvgSrc:string,
    text:string,
    action:IHandleActionButton,
    classList:string[]
}

export interface IPromotionItem {
    id:number,
    image:string,
    title:string,
    description:string,
    price:number,
    discount_price:number,
    discount:number
}

export interface IPromotionBigItem extends IPromotionItem {
    // actionButton:IActionButton
}

export interface IPromotionsSmallBox {
    promotionsSmallList:IPromotionItem[],
    promotionsBigList:IPromotionBigItem[]
}

export interface INewsItem {
    id:number,
    image:string,
    title:string,
    content_short:string,
    date:Date,
}

export interface INewsPost {
    id:number,
    image:string,
    title:string,
    content:string,
    date:Date,
}

export interface INewsList {
    items:INewsItem[],
    title:string
}

export interface IFlexileInfoList {

}

export interface INewsBlock {
    newList:INewsItem[],
    flexibleInfoList:IFlexileInfoList
}

export interface ICarouselItem {
    photoUrl:string,
    title:string,
    description:string,
    content:string
}

export interface ICarouselBlock {
    title:string,
    items:ICarouselItem[],
    activeIndex:number
}

export interface ISubscribeForm {
    value:string,
    action:(value:string) => void
}

export interface ISubscribeBlock {
    title:string,
    description:string,
    subscribeForm:ISubscribeForm
}

export interface IContactsList {
    title:string,
    items:string[]
}

export interface IIconLink {
    iconName:string,
    link:string
}

export interface ISocialList {
    title:string,
    items:IIconLink[]
}

export interface IBackForm {
    title:string,
    name:string,
    cell:string,
    message:string,
}

export interface IBackFormAction extends IBackForm {
    action:(form:IBackFormAction) => void
}

export interface IFooterBlock {
    footerMenu:IMainMenuData,
    contactsList:IContactsList,
    socialList:ISocialList,
    backForm:IBackFormAction
}

export interface IMapPoint {
    laltitude:number,
    longtitude:number
}

export interface IWarehouse {
    id:string,
    photoUrl:string,
    address:string,
    description:string,
    coordinates:IMapPoint|undefined
}

export interface IInfoLayer {
    text:string,
    timer:number,
    active:boolean,
    showInfoLayer:(payload:any) => void,
    hideInfoLayer:() => void
}

export interface IProductItem extends IProduct {
    count:number
}

export interface ICart {
    products:IProductItem[],
    totalCount:number,
    totalPrice:number,
    totalPriceDiscount:number
}

export interface IUser {
    id:number,
    photoUrl:string,
    fname:string,
    lname:string,
    email:string,
    cell:string
}

export interface IRegisterForm {
    name:string,
    email:string,
    cell:string,
    password:string,
    changeRegisterFormField:(payload:{name:string, value:string}) => void,
    cleanRegisterForm:() => void
}

export interface ILoginForm {
    email:string,
    password:string,
    changeLoginFormField:(payload:{name:string, value:string}) => void,
    cleanLoginForm:() => void
}

/** PAGES |
 *        |
 *        V
*/

export interface ISearchState {
    productsRequestState:IGetProductsRequest,
    searchFormState:ISearchForm,
    mainMenuSimpleState:IMainMenuData,
    topNavBarState:ITopNavBarState,
    setProductsSuccess:IHandleSearch,
    getProductsRequestSended:IHandle,
    infoLayerState:IInfoLayer,
    cartState:ICart
}

export interface IHomePage {
    topNavBarState:ITopNavBarState,
    mainMenuOriginState:IMainMenuData,
    bigSearchBlockState:IBigSearchBlock,
    promotionsSmallBoxState:IPromotionsSmallBox,
    newBlockState:INewsBlock,
    carouselState:ICarouselBlock,
    subscribeBlockState:ISubscribeBlock,
    footerBlockState:IFooterBlock,
    setPromotions:(payload:{promotions:IPromotionItem[], promotions_big:IPromotionBigItem[]}) => void,
    setNews:(payload:INewsItem[]) => void
}

export interface IProfilePage {
    topNavBarState:ITopNavBarState,
    mainMenuSimpleState:IMainMenuData,
    userState:IUser,
    cartState:ICart,
    infoLayerState:IInfoLayer,
    removeProductFromCart:(payload:string) => void,
    plusProductToCart:(payload:number) => void,
    minusProductFromCart:(payload:number) => void,
    showInfoLayer:(payload:any) => void,
    clearCart:() => void,
    setUserFullData:(payload:IUser) => void
}

export interface IRootApp {
    infoLayerState:IInfoLayer,
    topNavBarState:ITopNavBarState,
}