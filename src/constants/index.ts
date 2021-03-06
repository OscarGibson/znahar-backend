const envPath = (env:string):string => {
    switch (env) {
        case "development":
            return "http://localhost:8000"

        case "test":
            return ""

        case "production":
            return ""
    
        default:
            return ""
    }
}

const MAIN_BACKEND = envPath(process.env.NODE_ENV)
// const MAIN_BACKEND = "http://www.apteka-znahar.com.ua"

// export const IMAGES_BACKEND = `http://res.cloudinary.com/hswukmday`
export const IMAGES_BACKEND = ``

export const GET_PRODUCTS_URL = `${MAIN_BACKEND}/znahar/products/`
export const REGISTER_USER = `${MAIN_BACKEND}/api/user/register`
export const ORDERS_URL = `${MAIN_BACKEND}/znahar/orders/`
export const CHECK_DISCOUNT_URL = `${MAIN_BACKEND}/znahar/check/`
export const LOGIN_URL = `${MAIN_BACKEND}/api/token/`
export const REFRESH_TOKEN_URL = `${MAIN_BACKEND}/api/token/refresh`
export const GET_USER_URL = `${MAIN_BACKEND}/api/user/`
export const GET_PROMOTIONS_URL = `${MAIN_BACKEND}/api/promotions/`
export const GET_NEWS_URL = `${MAIN_BACKEND}/api/news/`
export const GET_SETTINGS_URL = `${MAIN_BACKEND}/znahar/settings/`
export const GET_WAREHOUSES_URL = `${MAIN_BACKEND}/znahar/warehouses/`
export const GET_HISTORY_URL = `${MAIN_BACKEND}/znahar/orders/`
export const GET_MAPS_URL = GET_WAREHOUSES_URL
export const GET_JOBS_URL = `${MAIN_BACKEND}/znahar/jobs/`
export const SEND_FEEDBACK = `${MAIN_BACKEND}/znahar/feedback/`

export const IN_ALL_WAREHOUSES = "У всіх Аптеках"

export const GOOGLE_MAPS_API_KEY = "AIzaSyChgeJrzhZ47098issZ0zJ_uJvZM122NxQ"