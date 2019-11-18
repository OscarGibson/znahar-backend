import React from 'react'
import { connect } from 'react-redux'
import TopNavTemplate from './TopNav.template'
import { TopNavType } from './TopNav.types'
import Actions from './TopNav.action'

interface TopNavProps extends TopNavType {
    setUserName:(userName:string) => void
    setLogin:() => void,
    // setLogout:() => void
}

const mapStateToProps = (reducer:any):TopNavType => {
    const { TopNavReducer } = reducer
    const { totalCount } = reducer.SearchReducer.cartState
    const phonesNumbers = reducer.DefaultReducer.topNavBarState.phonesNumbers
    return {
        ...TopNavReducer,
        itemCount:totalCount,
        cellList:phonesNumbers
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        setUserName:(userName:string) => {dispatch(Actions.setUserName(userName))},
        setLogin:() => {dispatch(Actions.setLogin())},
        // setLogout:() => {dispatch(Actions.setLogout())},
    }
}

class TopNavComponent extends React.Component<TopNavProps, {}> {
    constructor(props:TopNavProps, state:{}) {
        super(props, state)

        this.getUserInfo = this.getUserInfo.bind(this)

        this.getUserInfo()
    }
    getUserInfo() {
        const { setUserName } = this.props
        const userName = localStorage.getItem("userName")
        if (userName && userName !== "") {
            setUserName(userName)
        } else {
            setUserName("Профіль")
        }
        const accessToken = localStorage.getItem("accessToken")
        // const refreshToken = localStorage.getItem("refreshToken")

        if (accessToken) {
            this.props.setLogin()
        }
    }
    render() {
        return (
            <TopNavTemplate {...this.props}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavComponent)