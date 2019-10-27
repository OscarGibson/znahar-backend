import { HistoryItemState } from "../components/ProfileComponents/History"
import { PaginatorPropsType } from "../components/Paginator/Paginator.types"

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
    warehouses:IWarehouse[],
    selectedFilter:string
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
    warehouses:IWarehouse[]
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
    date:string
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
    uuid:string,
    photoUrl:string,
    name:string,
    description:string,
    coordinates:IMapPoint|undefined
}

export interface ISettings {
    id:number,
    contact_cell_top:string[],
    contact_cell_footer:string[],
    contact_email:string,
    facebook_link:string,
    instagram_link:string,
    youtube_link:string
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


export interface IRegisterFormState {
    name:string,
    email:string,
    cell:string,
    password:string,
    // validated:boolean
}


export interface IRegisterFormProps extends IRegisterFormState {
    changeRegisterFormField:(payload:{name:string, value:string}) => void,
    cleanRegisterForm:() => void,
    // handleFormSubmit:(event:React.FormEvent<HTMLFormElement>) => void
}

export interface IRegisterForm {
    fname:string,
    lname:string,
    email:string,
    cell:string,
    password:string,
    validated:boolean,
    changeRegisterFormField:(payload:{name:string, value:string}) => void,
    cleanRegisterForm:() => void,
    handleFormSubmit:(event:React.FormEvent<HTMLFormElement>) => void,
    validateRegisterForm:() => void,
    unValidateRegisterForm:() => void
}

export interface ILoginForm {
    email:string,
    password:string,
    errors:string,
    changeLoginFormField:(payload:{name:string, value:string}) => void,
    cleanLoginForm:() => void,
    setLoginErrors:(error:string) => void
}

export interface INewsPage {
    newsList:INewsItem[],
    promotions:IPromotionItem[],
    setPromotions:(payload:{promotions:IPromotionItem[], promotions_big:IPromotionBigItem[]}) => void,
    setNews:(payload:INewsItem[]) => void
}

export interface INewsPostPage {
    newsPost:INewsPost,
    promotions:IPromotionItem[],
    setPromotions:(payload:{promotions:IPromotionItem[], promotions_big:IPromotionBigItem[]}) => void,
    setNewsPost:(payload:INewsPost) => void,
    setNews:(payload:INewsItem[]) => void,
    otherNews:INewsItem[]
}

export interface IPromotionsPage {
    promotions:IPromotionItem[],
    promotions_big:IPromotionBigItem[],
    setPromotions:(payload:{promotions:IPromotionItem[], promotions_big:IPromotionBigItem[]}) => void,
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
    cartState:ICart,
    paginationState:PaginatorPropsType
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

export interface IUserForm {
    fname:string,
    lname:string,
    email:string,
    cell:string,
    password:string
}

export interface SettingsState {
    userForm:IUserForm,
    generalBlockEditable:boolean,
    privacyBlockEditable:boolean,
    changeUserFormField:(event:any) => void,
    submitUserForm:(event:any) => void,
    submitPrivacyForm:(event:any) => void,
    changeEditable:(editable:boolean, name:string) => void
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
    setUserFullData:(payload:IUser) => void,
    warehouses:IWarehouse[],
    settings:SettingsState,
    setPrivacyEditable:(isEditable:boolean) => void,
    setGeneralEditable:(isEditable:boolean) => void,
    setProfileFormField:(payload:{name:string, value:string}) => void,
    setSettingsForm:(payload:IUserForm) => void,
    setHistory:(orders:HistoryItemState[]) => void
}

export interface IRootApp {
    infoLayerState:IInfoLayer,
    topNavBarState:ITopNavBarState,
    settings:ISettings,
    warehouses:IWarehouse[],
    footerBlockState:IFooterBlock,
}