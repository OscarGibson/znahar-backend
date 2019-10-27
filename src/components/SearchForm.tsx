import React from 'react'
import { connect } from 'react-redux'
import { ISearchForm, IHandleSearch } from '../types'
import ActionButton from './ActionButton'
import { changeSearchKey, changeFilter } from '../actions'

const mapStateToProps = (reducer:any):ISearchForm => {
    const { searchFormState } = reducer.SearchReducer
    const { warehouses } = reducer.DefaultReducer
    return {
        ...searchFormState,
        warehouses,
    }
}

interface ISearchFormFilter extends ISearchForm {
    // selectedFilter:string
}

interface ISearchFormCustom extends ISearchForm {
    action:IHandleSearch,
    changeSearchKey:(searchKey:string) => void,
    changeFilter:(filter:string) => void
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        changeSearchKey:(searchKey:string) => {dispatch(changeSearchKey(searchKey))},
        changeFilter:(filter:string) => {dispatch(changeFilter(filter))}
    }
}

class SearchFormComponent extends React.Component<ISearchFormCustom, ISearchFormFilter> {

    constructor(props:ISearchFormCustom, state:ISearchFormFilter) {
        super(props, state)

        this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this)
        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)

    }

    handleSearch(searchInput:string, selectedFilter:string, action:IHandleSearch) {
        action(searchInput, selectedFilter)
    }

    handleSearchFormSubmit(event:React.FormEvent<HTMLFormElement>):void {
        event.preventDefault()
        const { searchInput, selectedFilter } = this.state
        const { action } = this.props
        this.handleSearch(searchInput, selectedFilter, action)
    }

    handleSearchFieldChange(event:React.ChangeEvent<HTMLInputElement>):void {
        event.preventDefault()
        const { changeSearchKey } = this.props
        changeSearchKey(event.target.value)
    }

    handleFilterChange(event:React.ChangeEvent<HTMLSelectElement>):void {
        const { changeFilter } = this.props
        changeFilter(event.target.value)
    }

    render() {
        const { searchInput, warehouses } = this.props
        return (
            <div className="SearchForm">
                <div className="content standart-container">
                    <h1 className="title">Пошук</h1>

                    <div className="input-group standart-container">
                        <input
                            type="text"
                            id="searchInput"
                            value={searchInput}
                            className="form-control"
                            aria-label="Sarch in warehouses"
                            onChange={this.handleSearchFieldChange}
                            placeholder="Введіть назву товару"
                        />
                        <select className="custom-select" id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                            onChange={this.handleFilterChange}
                            >
                            <option selected>У всіх Аптеках</option>
                            {warehouses.map((warehouse, index) => {
                                return (
                                    <option key={`warehouse-${index}`} value={warehouse.uuid}>
                                        {`№${warehouse.uuid} ${warehouse.name}`}
                                    </option>
                                )
                            })}
                        </select>
                        <div className="input-group-append">
                            <ActionButton
                                text="Шукати"
                                classList={["default-button"]}
                                action={this.handleSearchFormSubmit}
                                iconName=""
                                iconSvgSrc=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const SearchForm = connect(mapStateToProps, mapDispatchToProps)(SearchFormComponent)

export default SearchForm