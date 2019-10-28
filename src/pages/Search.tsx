import React from 'react'
import { connect } from 'react-redux'
import { mainMenuSimpleState } from '../redusers/initState'
import { 
    getProductsRequestSended,
    setProductsSuccess,
    changeSearchKey
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
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        getProductsRequestSended: () => dispatch(getProductsRequestSended()),
        setProductsSuccess: (products:any) => dispatch(setProductsSuccess(products)),
        changePage:(newPage:number) => {dispatch(changePage(newPage))},
        changeSearchKey:(searchKey:string) => {dispatch(changeSearchKey(searchKey))},
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
        console.log("constructor")
    }

    componentDidMount() {
        this.initSearch()
    }

    initSearch() {
        console.log("initSearch")
        const search = window.location.search
        const params = new URLSearchParams(search)
        const searchInput = params.get('searchKey')
        const selectedFilter = params.get('selectedFilter')
        const { changeSearchKey } = this.props
        if (searchInput && searchInput !== "")
            changeSearchKey(searchInput)
        this.handleSearch(
            searchInput === null ? "" : searchInput,
            selectedFilter === null ? IN_ALL_WAREHOUSES : selectedFilter,
        )
    }

    handleSearch(searchKey:string, warehouse_id:string = IN_ALL_WAREHOUSES) {
        const { 
            getProductsRequestSended,
            setProductsSuccess,
            paginationState,
            changePage
        } = this.props
        getProductsRequestSended()

        let params:{[key:string]:any} = {
            offset:paginationState.offset,
            limit:paginationState.limit,
            filter_name:searchKey,
        }
        if (warehouse_id === IN_ALL_WAREHOUSES)
            params["warehouses"] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
        else
            params["warehouses"] = [warehouse_id]

        axios.get(GET_PRODUCTS_URL, {
            params
        })
        .then((response) => {
            if (response.data.code === 200) {
                setProductsSuccess(response.data)
                changePage((paginationState.offset / paginationState.limit) + 1)
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