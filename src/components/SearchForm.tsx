import React from 'react'
import { connect } from 'react-redux'
import { ISearchForm, IHandleSearch, IWarehouse } from '../types'
import ActionButton from './ActionButton'
import { changeSearchKey, changeFilter } from '../actions'
import Autosuggest from 'react-autosuggest'
import { mainWarehouse } from '../redusers/initState'


const getSuggestions = (value:string, listOfNames:string[]) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length;
   
    const result = inputLength === 0 ? [] : listOfNames.filter(name =>
      name.toLowerCase().slice(0, inputLength) === inputValue
    )
    return result
}

const getSuggestionValue = (suggestion:string) => {
    return suggestion
}

const mapStateToProps = (reducer:any):ISearchForm => {
    const { searchFormState } = reducer.SearchReducer
    const { warehouses, autofillList } = reducer.DefaultReducer
    return {
        ...searchFormState,
        warehouses,
        autofillList,
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

const renderSuggestion = (suggestion:string) => (
    <div>
      {suggestion}
    </div>
)

class SearchFormComponent extends React.Component<ISearchFormCustom, any> {

    constructor(props:ISearchFormCustom, state:any) {
        super(props, state)

        this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this)
        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
        this.handlePressEnter = this.handlePressEnter.bind(this)

        this.state = {
            suggestions: [],
        }

    }

    handleSearch(searchInput:string, selectedFilter:string, action:IHandleSearch) {
        action(searchInput, selectedFilter)
    }

    handleSearchFormSubmit(event:React.FormEvent<HTMLFormElement>):void {
        event.preventDefault()
        const { searchInput, selectedFilter } = this.props
        const { action } = this.props
        this.handleSearch(searchInput, selectedFilter, action)
    }

    handleSearchFieldChange(event:React.ChangeEvent<HTMLInputElement>, lprops:{newValue:string}):void {
        const { newValue } = lprops
        event.preventDefault()
        const { changeSearchKey } = this.props
        changeSearchKey(newValue)
    }

    handleFilterChange(event:React.ChangeEvent<HTMLSelectElement>):void {
        const { changeFilter } = this.props
        changeFilter(event.target.value)
    }

    renderWarehouseOption(warehouse:IWarehouse, selectedFilter:string, index:number) {
        let selected = warehouse.uuid === selectedFilter ? true : false
        let name = warehouse.name === warehouse.uuid ? `${warehouse.name}` : `№${warehouse.uuid} ${warehouse.name}`
        return (
            <option selected={selected} key={`warehouse-${index}`} value={warehouse.uuid}>
                {name}
            </option>
        )
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = (props:{ value:string }) => {
        const { value } = props
        if (value.length > 2) {
            const { autofillList } = this.props
            this.setState({
                suggestions: getSuggestions(value, autofillList)
            })    
        }
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        })
    }

    handlePressEnter(event:any) {
        if (event.key === 'Enter') {
            this.handleSearchFormSubmit(event)
        }
    }

    render() {
        const { searchInput, warehouses, selectedFilter } = this.props
        const { suggestions } = this.state
        return (
            <div className="SearchForm">
                <div className="content standart-container">
                    <h1 className="title">Пошук</h1>

                    <div className="input-group standart-container">
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={{
                                onChange:this.handleSearchFieldChange,
                                value:searchInput,
                                placeholder:"Введіть назву товару",
                                onKeyDown:this.handlePressEnter,
                            }}
                        />
                        <select className="custom-select" id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                            onChange={this.handleFilterChange}
                            >
                            {[mainWarehouse, ...warehouses].map((warehouse, index) => {
                                return (
                                    this.renderWarehouseOption(warehouse, selectedFilter, index)
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