const envPath = ():string => {
    switch (process.env.NODE_ENV) {
        case "development":
            return "http://www.apteka-znahar.com.ua"

        case "test":
            return ""

        case "production":
            return ""
    
        default:
            return ""
    }
}

const MAIN_BACKEND = envPath()

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