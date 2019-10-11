import React from 'react'
import { connect } from 'react-redux'
import { mainMenuSimpleState } from '../redusers/initState'
import { 
    getProductsRequestSended,
    setProductsSuccess
} from '../actions'
import SearchBlock from '../components/SearchBlock'
import axios from 'axios'
import { ISearchState } from '../types'
import MainMenuSimple from '../components/MainMenuSimple'
import InfoLayer from '../components/InfoLayer'
import { GET_PRODUCTS_URL } from '../constants';


// interface SearchProps extends ISearchState {
//     getProductsRequestSended: IAction,
//     setProductsSuccess: IActionPayload
// }

const mapDispatchToProps = (dispatch:any) => {
    return {
        getProductsRequestSended: () => dispatch(getProductsRequestSended()),
        setProductsSuccess: (products:any) => dispatch(setProductsSuccess(products))
    }
  }

const mapStateToProps = (reducer:any) => {
    const { SearchReducer } = reducer
    return {
        ...SearchReducer
    }
}


class SearchPage extends React.Component<ISearchState, ISearchState> {

    constructor(props:ISearchState, state:ISearchState) {
        super(props, state)

        this.state = {
            ...props
        }

        this.handleSearch = this.handleSearch.bind(this)
    }

    // componentWillUnmount() {
    //     const { cartState } = this.props
    //     const cartStateJsonStr:string = JSON.stringify(cartState)
    //     localStorage.setItem("cart", cartStateJsonStr)
    // }

    handleSearch(searchKey:string, warehouse_id:string) {
        const { 
            getProductsRequestSended,
            setProductsSuccess
        } = this.props
        getProductsRequestSended()

        let params:{[key:string]:any} = {
            offset:0,
            limit:10,
            filter_name:searchKey,
        }
        if (warehouse_id === "У всіх Аптеках")
            params["warehouses"] = [1,2,3,4,5,6,7,8,9]
        else
            params["warehouses"] = [warehouse_id]

        console.log("handleSearch: ", params)

        axios.get(GET_PRODUCTS_URL, {
            params
        })
        .then((response) => {
            if (response.data.code === 200) {
                console.log("SUCCESS", response.data)
                setProductsSuccess(response.data)    
            }
        })
        .catch((error) => {
            console.log("ERROR")
            
        })
        .finally(() => {

        })
    }

    componentWillUpdate() {
        console.log("componentWillUpdate")
    }

    componentDidUpdate() {
        console.log("componentDidUpdate")
    }

    render() {
        const { productsRequestState, searchFormState, infoLayerState } = this.props
        const { products, isRequestSended, isResponseRecieved } = productsRequestState
        const { searchFormSubmitted, searchInput } = searchFormState

        return (
            <div className="search-page">
                <MainMenuSimple { ...mainMenuSimpleState }/>
                <SearchBlock
                    products={products}
                    isRequestSended={isRequestSended}
                    isResponseRecieved={isResponseRecieved}
                    searchInput={searchInput}
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