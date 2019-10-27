export enum PAGINATION_OPTIONS {
    P10_PER_PAGE = 10,
    P20_PER_PAGE = 20,
    P30_PER_PAGE = 50
}

export interface PaginatorPropsType {
    limit:PAGINATION_OPTIONS,
    offset:number,
    currentPage:number,
    totalPages:number
}