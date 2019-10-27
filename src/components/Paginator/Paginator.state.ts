import { PaginatorPropsType, PAGINATION_OPTIONS } from "./Paginator.types"

export const initState:PaginatorPropsType = {
    offset:0,
    limit:PAGINATION_OPTIONS.P10_PER_PAGE,
    currentPage:1,
    totalPages:100
}