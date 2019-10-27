import React from 'react'
import { connect } from 'react-redux'
import { PaginatorPropsType, PAGINATION_OPTIONS } from './Paginator.types'
import PaginatorTemplate from './Paginator.template'
import { setState, changeLimit } from './Paginator.actions'

interface PaginatorPropsExtend extends PaginatorPropsType {
    setState:(state:PaginatorPropsType) => void
    moveTo:(offset:number, limit:number, newPage:number) => void
    changeLimit:(newLimit:PAGINATION_OPTIONS) => void
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        setState:(state:PaginatorPropsType) => {dispatch(setState(state))},
        changeLimit:(newLimit:PAGINATION_OPTIONS) => {dispatch(changeLimit(newLimit))}
    }
}

const mapStateToProps = (reducers:any):PaginatorPropsType => {
    const { PaginatorReducer } = reducers
    return {
        ...PaginatorReducer
    }
}

class PaginatorComponent extends React.Component<PaginatorPropsExtend, PaginatorPropsType> {
    constructor(props:PaginatorPropsExtend, state:PaginatorPropsType) {
        super(props, state)
    }

    render() {
        return (
            <PaginatorTemplate {...this.props}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginatorComponent)