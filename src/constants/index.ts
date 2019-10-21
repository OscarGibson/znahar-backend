const envPath = (env:string):string => {
    switch (env) {
        case "development":
            return "http://localhost:8000"

        case "test":
            return ""

        case "production":
            return "http://www.apteka-znahar.com.ua"
    
        default:
            return ""
    }
}

const MAIN_BACKEND = envPath(process.env.NODE_ENV)
// const MAIN_BACKEND = "http://www.apteka-znahar.com.ua"

export const IMAGES_BACKEND = `${MAIN_BACKEND}`

export const GET_PRODUCTS_URL = `${MAIN_BACKEND}/znahar/products/`
export const REGISTER_USER = `${MAIN_BACKEND}/api/user/register`
export const ORDERS_URL = `${MAIN_BACKEND}/znahar/orders/`
export const LOGIN_URL = `${MAIN_BACKEND}/api/token/`
export const REFRESH_TOKEN_URL = `${MAIN_BACKEND}/api/token/refresh`
export const GET_USER_URL = `${MAIN_BACKEND}/api/user/retrieve`
export const GET_PROMOTIONS_URL = `${MAIN_BACKEND}/api/promotions/`
export const GET_NEWS_URL = `${MAIN_BACKEND}/api/news/`
export const GET_SETTINGS_URL = `${MAIN_BACKEND}/znahar/settings/`
export const GET_WAREHOUSES_URL = `${MAIN_BACKEND}/znahar/warehouses/`
export const GET_HISTORY_URL = `${MAIN_BACKEND}/znahar/orders/`
export const GET_MAPS_URL = GET_WAREHOUSES_URL