import {
    ISearchState,
    IProduct,
    IGetProductsRequest,
    ISearchForm,
    ITopNavBarState,
    IMainMenuData,
    IHomePage,
    IBigSearchBlock,
    IActionButton,
    IPromotionBigItem,
    IPromotionsSmallBox,
    INewsBlock,
    INewsList,
    ICarouselBlock,
    ISubscribeBlock,
    ISubscribeForm,
    IFooterBlock,
    IContactsList,
    ISocialList,
    IBackFormAction,
    IWarehouse,
    IInfoLayer,
    IProfilePage,
    IUser,
    ICart,
    IRootApp,
    IRegisterForm,
    ILoginForm,
    IPromotionItem,
    INewsItem,
    INewsPage,
    INewsPostPage,
    INewsPost,
    IPromotionsPage,
    SettingsState,
    IUserForm
} from '../../types'
import { initState as paginatorInitState } from '../../components/Paginator/Paginator.state'
import { IN_ALL_WAREHOUSES } from '../../constants';

export const initProducts:IProduct[] = []

export const productsRequestState:IGetProductsRequest = {
    message:"",
    error:"",
    code:0,
    products:initProducts,
    total:0,
    isRequestSended:false,
    isResponseRecieved:false
}

export const mainWarehouse:IWarehouse = {
    name:IN_ALL_WAREHOUSES,
    description:"",
    photoUrl:"",
    uuid:IN_ALL_WAREHOUSES,
    coordinates:undefined
}

export const searchFormState:ISearchForm = {
    searchInput: "",
    searchFormSubmitted:false,
    // action:(searchKey:string, selectedFiler:string|undefined) => {
    //     window.location.href = `/search?searchKey=${searchKey}&selectedFilter=${selectedFiler}`
    // },
    warehouses:[],
    selectedFilter:IN_ALL_WAREHOUSES
}

export const mainMenuSimpleState:IMainMenuData = {
    logoUrl:"/static/images/logo.png",
    items:[{
        name:"Головна",
        url:"/"
    },{
        name:"Акції",
        url:"/promotions"
    },{
        name:"Найближча Аптека",
        url:"/map"
    },{
        name:"Новини",
        url:"/news"
    },{
        name:"Вакансії",
        url:"/jobs"
    }],

}

export const mainMenuOriginState:IMainMenuData = {
    ...mainMenuSimpleState
}

export const bigSearchBlockState:IBigSearchBlock = {
    searchFormState:searchFormState,
    warehouses:[]
}

export const actionButton:IActionButton = {
    text:"Show all",
    action: () => {},
    classList:[],
    iconName:"",
    iconSvgSrc:""
}

export const promotionBigItem:IPromotionBigItem = {
    id:-1,
    photo:"/static/images/big-pills.png",
    title:"Profilaktone",
    description:"Містить масло печінки акули, вітаміни А, D, E, C та мінерали Цинк і Селен. Масло печінки акули, що міститься в продукті походить від уловів біля Ісландії та Фарерських островів.",
    price:100,
    discount_price:80,
    discount:20,
    // actionButton: actionButton
}

export const promotionsSmallBoxState:IPromotionsSmallBox = {
    promotionsSmallList:[],
    promotionsBigList:[]
}

export const newList:INewsList = {
    items:[],
    title:"Актуальні Новини"
}

export const newBlockState:INewsBlock = {
    newList:[],
    flexibleInfoList:{}
}

export const carouselState:ICarouselBlock = {
    title: "Експерти Нам Довіряють",
    items: [{
        photoUrl: "https://encrypted-tbn0.gstatic.com/static/images?q=tbn:ANd9GcS9pKhNdORp7GaKjJUTFPfZwZfURmKVFiK5dWKn8eJQM5J40HHlaw",
        title: "Катерина Шевченко",
        description: "Співзасновник ТОВ “Фарма Медікал”",
        content: "Доброго дня, замовила туніку 'селен' та костюм 'хельсінкі' все підійшло чудово, якість, просто супер дякую Вам Панянка. А ще приємно вразив маленький запашний презент, дякую."
    },{
        photoUrl: "https://encrypted-tbn0.gstatic.com/static/images?q=tbn:ANd9GcS9pKhNdORp7GaKjJUTFPfZwZfURmKVFiK5dWKn8eJQM5J40HHlaw",
        title: "Катерина Шевченко",
        description: "Співзасновник ТОВ “Фарма Медікал”",
        content: "Доброго дня, замовила туніку 'селен' та костюм 'хельсінкі' все підійшло чудово, якість, просто супер дякую Вам Панянка. А ще приємно вразив маленький запашний презент, дякую."
    },{
        photoUrl: "https://encrypted-tbn0.gstatic.com/static/images?q=tbn:ANd9GcS9pKhNdORp7GaKjJUTFPfZwZfURmKVFiK5dWKn8eJQM5J40HHlaw",
        title: "Катерина Шевченко",
        description: "Співзасновник ТОВ “Фарма Медікал”",
        content: "Доброго дня, замовила туніку 'селен' та костюм 'хельсінкі' все підійшло чудово, якість, просто супер дякую Вам Панянка. А ще приємно вразив маленький запашний презент, дякую."
    }],
    activeIndex: 0
}

export const subscribeForm:ISubscribeForm = {
    value:"",
    action:(value:string) => {}
}

export const subscribeBlockState:ISubscribeBlock = {
    title:"Економте час та гроші!",
    description:"Підпишіться і ми надсилатимемо вам найкращі пропозиції",
    subscribeForm:subscribeForm
}

export const footerMenu:IMainMenuData = {
    logoUrl:"/static/images/logo.png",
    items:[{
        name:"Пошук та бронювання",
        url:"/search"
    },{
        name:"Акції",
        url:"/promotions"
    },{
        name:"Найближча Аптека",
        url:"/map"
    },{
        name:"Новини",
        url:"/news"
    },{
        name:"Вакансії",
        url:"/jobs"
    }],

}

export const contactsList:IContactsList = {
    title:"Контактна інформація",
    items:[]
}


export const socialList:ISocialList = {
    title:"Ми у соцмережах",
    items:[{
        iconName:"facebook",
        link:"https://www.facebook.com/aptekaznahar/"
    }]
}

export const backForm:IBackFormAction = {
    title:"Форма Зворотнього зв'язку",
    name:"",
    cell:"",
    message:"",
    action:() => {},
    showInfoLayer:() => {}
}

export const footerBlockState:IFooterBlock = {
    footerMenu:footerMenu,
    contactsList:contactsList,
    socialList:socialList,
    backForm:backForm
}

export const warehouses:IWarehouse[] = []

export const getWarehouseById = (id:string, warehouses:IWarehouse[]):IWarehouse => {
    for (let warehouse of warehouses) {
        if (id == warehouse.uuid)
            return warehouse
    }
    return {
        name:"",
        description:"",
        uuid:id,
        photoUrl:"",
        coordinates:undefined
    }
}

export const infoLayerState:IInfoLayer = {
    text:"Стрепсілс з віт. С апельсин льодяники №24 успішно додано до списку бронювання",
    active:false,
    timer:0,
    showInfoLayer: (payload:IInfoLayer) => {},
    hideInfoLayer: () => {}
}

export const userInitState:IUser = {
    id:-1,
    photoUrl:"",
    fname:"",
    lname:"",
    email:"",
    cell:"+380",
    photo:""
}

let initCartState:ICart

const cartStateJsonStr = localStorage.getItem("cart")
if (cartStateJsonStr) {
    initCartState = JSON.parse(cartStateJsonStr)
} else {
    initCartState = {
        products:[],
        totalCount:0,
        totalPrice:0,
        totalPriceDiscount:0
    }
}

export const cartState:ICart = {
    ...initCartState
}

export const topNavBarState:ITopNavBarState = {
    phonesNumbers:[],
    fb_link:"",
    isUserAuth:false,
    userName:"",
    cartOrdersCount:initCartState.totalCount,
    setUserData:(payload:string) => {}
}

export const registerForm:IRegisterForm = {
    fname:"",
    lname:"",
    email:"",
    cell:"",
    password:"",
    validated:false,
    changeRegisterFormField:(payload:{name:string, value:string}) => {},
    cleanRegisterForm:() => {},
    handleFormSubmit:() => {},
    validateRegisterForm:() => {},
    unValidateRegisterForm:() => {}
}

export const loginForm:ILoginForm = {
    email:"",
    password:"",
    errors:"",
    changeLoginFormField:(payload:{name:string, value:string}) => {},
    cleanLoginForm:() => {},
    setLoginErrors:(error:string) => {}
}


export const newsPage:INewsPage = {
    newsList:[],
    promotions:[],
    setPromotions:(payload:{promotions:IPromotionItem[], promotions_big:IPromotionBigItem[]}) => {},
    setNews:(payload:INewsItem[]) => {}
}

export const newsPostPage:INewsPostPage = {
    newsPost:{
        id:-1,
        title:"",
        content:"",
        date: "",
        image:""
    },
    promotions:[],
    setPromotions:(payload:{promotions:IPromotionItem[], promotions_big:IPromotionBigItem[]}) => {},
    setNewsPost:(payload:INewsPost) => {},
    setNews:(payload:INewsItem[]) => {},
    otherNews:[]
}

export const promotionsPage:IPromotionsPage = {
    promotions:[],
    promotions_big:[],
    setPromotions:(payload:{promotions:IPromotionItem[], promotions_big:IPromotionBigItem[]}) => {},
}

/**
 * PAGES |
 *       |
 *       V
 */
export const searchInitState:ISearchState = {
    productsRequestState: productsRequestState,
    searchFormState: searchFormState,
    topNavBarState: topNavBarState,
    mainMenuSimpleState: mainMenuSimpleState,
    setProductsSuccess:(products) => {  },
    getProductsRequestSended:() => { },
    infoLayerState:infoLayerState,
    cartState:cartState,
    paginationState:paginatorInitState
}

export const homePageState:IHomePage = {
    topNavBarState: topNavBarState,
    bigSearchBlockState: bigSearchBlockState,
    mainMenuOriginState: mainMenuOriginState,
    promotionsSmallBoxState: promotionsSmallBoxState,
    infoLayerState:infoLayerState,
    newBlockState: newBlockState,
    carouselState: carouselState,
    subscribeBlockState: subscribeBlockState,
    footerBlockState: footerBlockState,
    setPromotions:(payload:{promotions:IPromotionItem[], promotions_big:IPromotionBigItem[]}) => {},
    setNews:(payload:INewsItem[]) => {}
}

export const profileSettingsState:SettingsState = {
    userForm:{
        fname:"",
        lname:"",
        email:"",
        cell:"",
        password:""
    },
    generalBlockEditable:false,
    privacyBlockEditable:false,
    changeUserFormField:(event:any) => {},
    submitUserForm:(event:any) => {},
    submitPrivacyForm:(event:any) => {},
    changeEditable:(editable:boolean, name:string) => {}
}

export const profilePageState:IProfilePage = {
    topNavBarState: topNavBarState,
    mainMenuSimpleState: mainMenuSimpleState,
    userState:userInitState,
    cartState:cartState,
    infoLayerState:infoLayerState,
    removeProductFromCart:(payload:string) => {},
    plusProductToCart:(payload:number) => {},
    minusProductFromCart:(payload:number) => {},
    showInfoLayer:(payload:any) => {},
    clearCart:() => {},
    setUserFullData:(payload:IUser) => {},
    warehouses:[],
    settings:profileSettingsState,
    setPrivacyEditable:(isEditable:boolean) => {},
    setGeneralEditable:(isEditable:boolean) => {},
    setProfileFormField:(payload:{name:string, value:string}) => {},
    setSettingsForm:(payload:IUserForm) => {},
    setHistory:() => {}
}

export const defaultState:IRootApp = {
    infoLayerState:infoLayerState,
    topNavBarState:topNavBarState,
    settings:{
        id:0,
        contact_cell_footer:[],
        contact_cell_top:[],
        facebook_link:"",
        instagram_link:"",
        youtube_link:"",
        contact_email:""
    },
    warehouses:[],
    footerBlockState:footerBlockState,
}

export const initialState = {
    userState:userInitState,
    searchState:searchInitState
};
