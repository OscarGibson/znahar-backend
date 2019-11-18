import { TopNavType } from "./TopNav.types"
import { initState } from "./TopNav.state"
import C from './TopNav.constants'

export const TopNavReducer = (state:TopNavType = initState, action:any):TopNavType => {

    if (action.type === C.PLUS_ITEM) {
        const { itemCount } = state
        return {
            ...state,
            itemCount: itemCount + action.payload
        }
    }

    if (action.type === C.MILUS_ITEM) {
        const { itemCount } = state
        return {
            ...state,
            itemCount: itemCount - action.payload
        }
    }

    if (action.type === C.NULL_ITEM) {
        return {
            ...state,
            itemCount: 0
        }
    }

    if (action.type === C.SET_CELL_LIST) {
        return {
            ...state,
            cellList: action.payload
        }
    }

    if (action.type === C.SET_LOGIN) {
        return {
            ...state,
            logged:true
        }
    }

    if (action.type === C.SET_LOGOUT) {
        return {
            ...state,
            logged:false
        }
    }

    if (action.type === C.SET_USER_NAME) {
        return {
            ...state,
            userName:action.payload
        }
    }

    return state
}