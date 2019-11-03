import React from 'react'
import { connect } from 'react-redux'
import { PaginatorPropsType, PAGINATION_OPTIONS } from './Paginator.types'
import PaginatorTemplate from './Paginator.template'
import { setState } from './Paginator.actions'

interface PaginatorPropsExtend extends PaginatorPropsType {
    setState:(state:PaginatorPropsType) => void
    moveTo:(limit:number, newPage:number) => void
    changeLimit:(newLimit:PAGINATION_OPTIONS) => void
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        setState:(state:PaginatorPropsType) => {dispatch(setState(state))},
    }
}

const mapStateToProps = (reducers:any):PaginatorPropsType => {
    const { PaginatorReducer } = reducers
    return {
        ...PaginatorReducer
    }
}

class PaginatorComponent extends React.Component<PaginatorPropsExtend, PaginatorPropsType> {
    render() {
        return (
            <PaginatorTemplate {...this.props}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginatorComponent)