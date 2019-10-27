import { initState } from "./Paginator.state"
import Constants from "./Paginator.constants"
import { PaginatorPropsType } from "./Paginator.types"

export const PaginatorReducer = (state:PaginatorPropsType = initState, action:any) => {
    if (action.type === Constants.SET_STATE) {
        const newState:PaginatorPropsType = action.payload
        return {
            ...newState
        }
    }
    if (action.type === Constants.CHANGE_LIMIT) {
        return {
            ...state,
            limit:action.payload
        }
    }
    if (action.type === Constants.CHANGE_PAGE) {
        return {
            ...state,
            currentPage:action.payload
        }
    }
    return state
}