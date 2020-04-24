import React from 'react'
import { connect } from 'react-redux'
import { ISearchForm, IWarehouse, IHandleSearch } from '../types'
import ActionButton from './ActionButton'
import { IN_ALL_WAREHOUSES } from '../constants'
import Autosuggest from 'react-autosuggest'

interface ISearchFormFilter extends ISearchForm {
    suggestions:string[],
}

interface ISearchFormCustom extends ISearchForm {
    action:IHandleSearch
}

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
    const warehouses:IWarehouse[] = reducer.DefaultReducer.warehouses
    const { autofillList } = reducer.DefaultReducer
    const { searchFormState } = reducer.HomeReducer.bigSearchBlockState
    const newState = {
        ...searchFormState,
        warehouses,
        autofillList
    }
    return newState
}

const renderSuggestion = (suggestion:string) => (
    <div>
      {suggestion}
    </div>
)

class SearchFormHome extends React.Component<ISearchFormCustom, ISearchFormFilter> {

    constructor(props:ISearchFormCustom, state:ISearchFormFilter) {
        super(props, state)

        this.state = {
            ...props,
            selectedFilter:IN_ALL_WAREHOUSES,
            suggestions: [],
        }

        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)

        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = (props:{ value:string }) => {
        const { value } = props
        const { autofillList } = this.props
        this.setState({
            suggestions: getSuggestions(value, autofillList)
        })
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        })
    }


    handleSearchSubmit(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault()
        const { searchInput, selectedFilter } = this.state
        const { action } = this.props
        action(searchInput, selectedFilter)
        this.setState({
            searchInput:""
        })
    }

    handleSearchFieldChange(event:React.ChangeEvent<HTMLInputElement>, lprops:{newValue:string}):void {
        event.preventDefault()
        this.setState({
            searchInput: lprops.newValue
        })
    }

    handleFilterChange(event:React.ChangeEvent<HTMLSelectElement>):void {
        this.setState({
            selectedFilter: event.target.value
        })
    }

    render() {
        const { searchInput,suggestions } = this.state
        const { warehouses } = this.props
        return (
            <div className="SearchFormHome">
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
                            }}
                        />
                    <select className="custom-select" id="inputGroupSelect04"
                        aria-label="Example select with button addon"
                        onChange={this.handleFilterChange}>
                        <option selected>У всіх Аптеках</option>
                        {warehouses.map((warehouse, index) => {
                            return (
                                <option key={`warehouses-home-${index}`} value={warehouse.uuid}>
                                    {`№${warehouse.uuid} ${warehouse.name}`}
                                </option>
                            )
                        })}
                    </select>
                    <div className="input-group-append">
                        <ActionButton
                            text="Шукати"
                            classList={["default-button"]}
                            action={this.handleSearchSubmit}
                            iconName=""
                            iconSvgSrc=""
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SearchFormHome)
