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
    IBackForm,
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
    IPromotionsPage
} from '../../types'

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

export const searchFormState:ISearchForm = {
    searchInput: "",
    searchFormSubmitted:false,
    // action:(searchKey:string, selectedFiler:string|undefined) => {
    //     window.location.href = `/search?searchKey=${searchKey}&selectedFilter=${selectedFiler}`
    // },
    warehouses:[]
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
        name:"Контакти",
        url:"/contacts"
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
    image:"/static/images/big-pills.png",
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
    title:"Зекономте час та гроші!",
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
        name:"Оптовим кліентам",
        url:"/for-clients"
    },{
        name:"Найблища Аптека",
        url:"/map"
    },{
        name:"Новини",
        url:"/news"
    },{
        name:"Мій Кабінет",
        url:"/profile"
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
        link:"https://facebook.com"
    },{
        iconName:"instagram",
        link:"https://instagram.com"
    },{
        iconName:"youtube",
        link:"https://youtube.com"
    }]
}

export const backForm:IBackFormAction = {
    title:"Форма Зворотнього звязку",
    name:"",
    cell:"",
    message:"",
    action:() => {}
}

export const footerBlockState:IFooterBlock = {
    footerMenu:footerMenu,
    contactsList:contactsList,
    socialList:socialList,
    backForm:backForm
}

export const warehouses:IWarehouse[] = []

// export const warehouses:IWarehouse[] = [{
//     id:"1",
//     address:"вул. Хімічна, 22",
//     description:"Години роботи: Пн-Пт: 8:00-21:00, Сб: 8:00 - 20:00, Нд: 9:00 - 19:00",
//     photoUrl:"http://www.apteka-znahar.com.ua/static/images/khimichna.jpg",
//     coordinates:undefined
// },{
//     id:"2",
//     address:"вул. Мазепи, 11",
//     description:"Години роботи: Пн-Пт: 8:00-21:00, Сб: 8:00 - 20:00, Нд: 9:00 - 19:00",
//     photoUrl:"http://www.apteka-znahar.com.ua/static/images/khimichna.jpg",
//     coordinates:undefined
// },{
//     id:"3",
//     address:"вул. Виговського, 29а",
//     description:"Години роботи: Пн-Пт: 8:00-21:00, Сб: 8:00 - 20:00, Нд: 9:00 - 19:00",
//     photoUrl:"http://www.apteka-znahar.com.ua/static/images/khimichna.jpg",
//     coordinates:undefined
// },{
//     id:"4",
//     address:"просп. Червоної Калини, 64",
//     description:"Години роботи: Пн-Пт: 8:00-21:00, Сб: 8:00 - 20:00, Нд: 9:00 - 19:00",
//     photoUrl:"http://www.apteka-znahar.com.ua/static/images/khimichna.jpg",
//     coordinates:undefined
// },{
//     id:"5",
//     address:"вул. Городоцька, 82",
//     description:"Години роботи: Пн-Пт: 8:00-21:00, Сб: 8:00 - 20:00, Нд: 9:00 - 19:00",
//     photoUrl:"http://www.apteka-znahar.com.ua/static/images/khimichna.jpg",
//     coordinates:undefined
// },{
//     id:"6",
//     address:"вул. Симоненка, 3",
//     description:"Години роботи: Пн-Пт: 8:00-21:00, Сб: 8:00 - 20:00, Нд: 9:00 - 19:00",
//     photoUrl:"http://www.apteka-znahar.com.ua/static/images/khimichna.jpg",
//     coordinates:undefined
// },{
//     id:"7",
//     address:"вул. Богдана Хмельницького, 1",
//     description:"Години роботи: Пн-Пт: 8:00-21:00, Сб: 8:00 - 20:00, Нд: 9:00 - 19:00",
//     photoUrl:"http://www.apteka-znahar.com.ua/static/images/khimichna.jpg",
//     coordinates:undefined
// },{
//     id:"8",
//     address:"вул. Дорошенка, 6",
//     description:"Години роботи: Пн-Пт: 8:00-21:00, Сб: 8:00 - 20:00, Нд: 9:00 - 19:00",
//     photoUrl:"http://www.apteka-znahar.com.ua/static/images/khimichna.jpg",
//     coordinates:undefined
// },{
//     id:"9",
//     address:"вул. Личаківська, 54/2",
//     description:"Години роботи: Пн-Пт: 8:00-21:00, Сб: 8:00 - 20:00, Нд: 9:00 - 19:00",
//     photoUrl:"http://www.apteka-znahar.com.ua/static/images/khimichna.jpg",
//     coordinates:undefined
// },{
//     id:"10",
//     address:"вул. Сихівська, 22",
//     description:"Години роботи: Пн-Пт: 8:00-21:00, Сб: 8:00 - 20:00, Нд: 9:00 - 19:00",
//     photoUrl:"http://www.apteka-znahar.com.ua/static/images/khimichna.jpg",
//     coordinates:undefined
// },{
//     id:"11",
//     address:"вул. Пасічна, 70",
//     description:"Години роботи: Пн-Пт: 8:00-21:00, Сб: 8:00 - 20:00, Нд: 9:00 - 19:00",
//     photoUrl:"http://www.apteka-znahar.com.ua/static/images/khimichna.jpg",
//     coordinates:undefined
// },{
//     id:"12",
//     address:"вул. Шевченка, 366в",
//     description:"Години роботи: Пн-Пт: 8:00-21:00, Сб: 8:00 - 20:00, Нд: 9:00 - 19:00",
//     photoUrl:"http://www.apteka-znahar.com.ua/static/images/khimichna.jpg",
//     coordinates:undefined
// }]

const warehousesIdList:{[id:string]:number} = {
    "1":0,
    "2":1,
    "3":2,
    "4":3,
    "5":4,
    "6":5,
    "7":6,
    "8":7,
    "9":8,
    "10":9,
    "11":10,
    "12":11
}

export const getWarehouseById = (id:string, warehouses:IWarehouse[]):IWarehouse => {
    console.log("getWarehouseById", id, warehouses)
    return warehouses[warehousesIdList[id]]
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
    cell:""
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
    isUserAuth:false,
    userName:"",
    cartOrdersCount:initCartState.totalCount,
    setUserData:(payload:string) => {}
}

export const registerForm:IRegisterForm = {
    name:"",
    email:"",
    cell:"",
    password:"",
    changeRegisterFormField:(payload:{name:string, value:string}) => {},
    cleanRegisterForm:() => {}
}

export const loginForm:ILoginForm = {
    email:"",
    password:"",
    changeLoginFormField:(payload:{name:string, value:string}) => {},
    cleanLoginForm:() => {}
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
    cartState:cartState
}

export const homePageState:IHomePage = {
    topNavBarState: topNavBarState,
    bigSearchBlockState: bigSearchBlockState,
    mainMenuOriginState: mainMenuOriginState,
    promotionsSmallBoxState: promotionsSmallBoxState,
    newBlockState: newBlockState,
    carouselState: carouselState,
    subscribeBlockState: subscribeBlockState,
    footerBlockState: footerBlockState,
    setPromotions:(payload:{promotions:IPromotionItem[], promotions_big:IPromotionBigItem[]}) => {},
    setNews:(payload:INewsItem[]) => {}
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
    warehouses:[]
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
