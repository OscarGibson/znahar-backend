import React from 'react';
import { connect } from 'react-redux';
import { ISearchForm, IHandleSearch } from '../types'
import ActionButton from './ActionButton';
import { warehouses } from '../redusers/initState';

const XOR = (a:boolean,b:boolean) => {
    return !( ( a && !b ) || ( !a && b ) )
}

const mapStateToProps = (reducer:any, other:any) => {
    const { searchInput, searchFormSubmitted } = reducer.SearchReducer.searchFormState
    return {
        searchInput, searchFormSubmitted
    }
}

interface ISearchFormFilter extends ISearchForm {
    selectedFilter:string
}

// const dispatchToProps = (dispatch:any) => {
//     return {
//         getProductsInSearch: (searchKey:string) => dispatch(getProductsInSearch(searchKey)),
//         getProductsFake: (searchKey:string) => dispatch(getProductsFake(searchKey))
//     }
// }

class SearchFormComponent extends React.Component<ISearchForm, ISearchFormFilter> {

    constructor(props:ISearchForm, state:ISearchFormFilter) {
        super(props, state)

        this.state = {
            ...props,
            selectedFilter:"У всіх Аптеках"
        }

        this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this)
        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount() {
        const search = window.location.search
        const params = new URLSearchParams(search)
        const searchInput = params.get('searchKey')
        const selectedFilter = params.get('selectedFilter')

        const { action } = this.props
        this.handleSearch(
            searchInput === null ? "" : searchInput,
            selectedFilter === null ? "У всіх Аптеках" : selectedFilter,
            action
        )
    }

    handleSearch(searchInput:string, selectedFilter:string, action:IHandleSearch) {
        action(searchInput, selectedFilter)
        this.setState({
            searchInput: ""
        })
    }

    handleSearchFormSubmit(event:React.FormEvent<HTMLFormElement>):void {
        event.preventDefault()
        const { searchInput, selectedFilter } = this.state
        const { action } = this.props
        this.handleSearch(searchInput, selectedFilter, action)
    }

    handleSearchFieldChange(event:React.ChangeEvent<HTMLInputElement>):void {
        event.preventDefault()
        this.setState({
            searchInput: event.target.value
        })
    }

    handleFilterChange(event:React.ChangeEvent<HTMLSelectElement>):void {
        this.setState({
            selectedFilter: event.target.value
        })
    }

    render() {
        const { searchInput } = this.state
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
                                    <option key={index} value={warehouse.id}>
                                        {`№${warehouse.id} ${warehouse.address}`}
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

const SearchForm = connect(mapStateToProps)(SearchFormComponent)

export default SearchForm