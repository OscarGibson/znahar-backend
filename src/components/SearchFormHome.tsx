import React from 'react';
import { connect } from 'react-redux';
import { ISearchForm, IWarehouse, IHandleSearch } from '../types'
import ActionButton from './ActionButton';

interface ISearchFormFilter extends ISearchForm {
    selectedFilter:string|undefined
}

interface ISearchFormCustom extends ISearchForm {
    action:IHandleSearch
}

const mapStateToProps = (reducer:any):ISearchForm => {
    const warehouses:IWarehouse[] = reducer.DefaultReducer.warehouses
    const { searchFormState } = reducer.HomeReducer.bigSearchBlockState
    const newState = {
        ...searchFormState,
        warehouses
    }
    return newState
}

class SearchFormHome extends React.Component<ISearchFormCustom, ISearchFormFilter> {

    constructor(props:ISearchFormCustom, state:ISearchFormFilter) {
        super(props, state)

        this.state = {
            ...props,
            selectedFilter:undefined
        }

        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
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
        const { warehouses } = this.props
        return (
            <div className="SearchFormHome">
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
