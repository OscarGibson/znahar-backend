import React from 'react'
import { connect } from 'react-redux'
import { mainMenuSimpleState } from '../redusers/initState'
import { 
    getProductsRequestSended,
    setProductsSuccess,
    changeSearchKey,
    changeFilter
} from '../actions'
import SearchBlock from '../components/SearchBlock'
import axios from 'axios'
import { ISearchState } from '../types'
import MainMenuSimple from '../components/MainMenuSimple'
import InfoLayer from '../components/InfoLayer'
import { GET_PRODUCTS_URL, IN_ALL_WAREHOUSES } from '../constants'
import { changePage } from '../components/Paginator/Paginator.actions'


interface ISearchStateExtend extends ISearchState {
    changePage:(newPage:number) => void,
    changeSearchKey:(searchKey:string) => void,
    changeFilter:(filter:string) => void
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        getProductsRequestSended: () => dispatch(getProductsRequestSended()),
        setProductsSuccess: (products:any) => dispatch(setProductsSuccess(products)),
        changePage:(newPage:number) => {dispatch(changePage(newPage))},
        changeSearchKey:(searchKey:string) => {dispatch(changeSearchKey(searchKey))},
        changeFilter:(filter:string) => {dispatch(changeFilter(filter))}
    }
  }

const mapStateToProps = (reducer:any):ISearchStateExtend => {
    const { SearchReducer, PaginatorReducer } = reducer
    return {
        ...SearchReducer,
        paginationState:PaginatorReducer
    }
}


class SearchPage extends React.Component<ISearchStateExtend, ISearchState> {

    constructor(props:ISearchStateExtend, state:ISearchState) {
        super(props, state)

        this.state = {
            ...props
        }

        this.handleSearch = this.handleSearch.bind(this)
        this.initSearch = this.initSearch.bind(this)
    }

    componentDidMount() {
        this.initSearch()
    }

    initSearch() {
        const search = window.location.search
        const params = new URLSearchParams(search)
        const searchInput = params.get('searchKey')
        const selectedFilter = params.get('selectedFilter')
        const { changeSearchKey, changeFilter } = this.props
        if (searchInput && searchInput !== "")
            changeSearchKey(searchInput)
        if (selectedFilter && selectedFilter !== "")
            changeFilter(selectedFilter)
        this.handleSearch(
            searchInput === null ? "" : searchInput,
            selectedFilter === null ? IN_ALL_WAREHOUSES : selectedFilter,
        )
    }

    handleSearch(searchKey:string, warehouse_id:string = IN_ALL_WAREHOUSES, newOffset= -1, newLimit= -1) {
        const { 
            getProductsRequestSended,
            setProductsSuccess,
            paginationState,
            changePage,
        } = this.props
        getProductsRequestSended()

        let offset = newOffset === -1 ? paginationState.offset : newOffset
        let limit = newLimit === -1 ? paginationState.limit : newLimit

        let params:{[key:string]:any} = {
            offset,
            limit,
            filter_name:searchKey,
        }
        if (warehouse_id === IN_ALL_WAREHOUSES) {
            let list = []
            for (let i = 1; i <= 100; i++) {
                list.push(i)
            }
            params["warehouses"] = list
        }
        else
            params["warehouses"] = [warehouse_id]

        axios.get(GET_PRODUCTS_URL, {
            params
        })
        .then((response) => {
            if (response.data.code === 200) {
                setProductsSuccess(response.data)
                changePage((offset / limit) + 1)
            }
        })
        .catch((error) => {
            console.log("ERROR")
            
        })
        .finally(() => {

        })
    }

    render() {
        const { productsRequestState, searchFormState, infoLayerState } = this.props
        const { products, isRequestSended, isResponseRecieved } = productsRequestState
        const { searchFormSubmitted, searchInput } = searchFormState

        const search = window.location.search
        const params = new URLSearchParams(search)
        const searchInputParam = params.get('searchKey')

        return (
            <div className="search-page">
                <MainMenuSimple { ...mainMenuSimpleState }/>
                <SearchBlock
                    products={products}
                    isRequestSended={isRequestSended}
                    isResponseRecieved={isResponseRecieved}
                    searchInput={searchInput || searchInputParam}
                    searchFormSubmitted={searchFormSubmitted}
                    handleSearch={this.handleSearch}
                />
                <InfoLayer {...infoLayerState}/>
            </div>
        )
    }
}

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchPage)

export default Search;