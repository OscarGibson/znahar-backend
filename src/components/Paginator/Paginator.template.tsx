import React from 'react'
import { PaginatorPropsType, PAGINATION_OPTIONS } from './Paginator.types'
import './Paginator.styles.scss'

interface PaginatorPropsExtend extends PaginatorPropsType {
    moveTo:(limit:number, newPage:number) => void,
    changeLimit:(newLimit:PAGINATION_OPTIONS) => void,
}


const LimitOption = (props:{option:number, limit:number, changeLimit:(newLimit:PAGINATION_OPTIONS) => void}) => {
    const { limit, option, changeLimit } = props
    const isActive = limit === option ? " active" : ""
    return (
        <span className={`button${isActive}`} onClick={() => {changeLimit(option)}}>{option}</span>
    )
}

const Arrow = (props:{
        delta:number, limit:number, currentPage:number,
        totalPages:number, moveToAction:(limit:number, newPage:number) => void
    }) => {
    const { delta, limit, currentPage, totalPages, moveToAction} = props
    const newPage = currentPage + delta
    const symbol = delta > 0 ? ">" : "<"
    if (newPage !== 0 && newPage !== totalPages) {
        return (<span className="button active" onClick={() => moveToAction(limit, newPage)}>{symbol}</span>)
    } else {
        return (<span className="button">{symbol}</span>)
    }
}

const PaginatorTemplate = (props:PaginatorPropsExtend) => {
    const { currentPage, limit, totalPages, moveTo, changeLimit } = props
    return (
        <div className="PaginatorTemplate standart-container mt-5">
            <div className="d-flex justify-content-between">
                <div className="p-2 bd-highlight">Показувати
                    <LimitOption option={PAGINATION_OPTIONS.P10_PER_PAGE} limit={limit} changeLimit={changeLimit}/>
                    <LimitOption option={PAGINATION_OPTIONS.P20_PER_PAGE} limit={limit} changeLimit={changeLimit}/>
                    <LimitOption option={PAGINATION_OPTIONS.P30_PER_PAGE} limit={limit} changeLimit={changeLimit}/>
                    товарів на сторінку</div>
                <div className="p-2 bd-highlight">Сторінка
                    <Arrow
                        delta={-1} limit={limit} currentPage={currentPage}
                        totalPages={totalPages} moveToAction={moveTo}/>
                    <span className="button active">{currentPage}</span>
                    <Arrow
                        delta={1} limit={limit} currentPage={currentPage}
                        totalPages={totalPages} moveToAction={moveTo}/>
                </div>
            </div>
        </div>
    )
}

export default PaginatorTemplate