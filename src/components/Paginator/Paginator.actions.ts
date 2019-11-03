import { PaginatorPropsType, PAGINATION_OPTIONS } from "./Paginator.types"
import Constants from "./Paginator.constants"

export const setState = (state:PaginatorPropsType) => {
    return {type:Constants.SET_STATE, payload:state}
}

export const changeLimit = (newLimit:PAGINATION_OPTIONS) => {
    return {type:Constants.CHANGE_LIMIT, payload:newLimit}
}

export const changePage = (newPage:number) => {
    return {type:Constants.CHANGE_PAGE, payload:newPage}
}

export const changeOffset = (newOffset:number) => {
    return {type:Constants.CHANGE_OFFSET, payload:newOffset}
}

export default {
    setState,
    changeLimit,
    changePage,
    changeOffset
}