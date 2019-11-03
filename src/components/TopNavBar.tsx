import React from 'react'
import { connect } from 'react-redux'
import ActionButton from './ActionButton'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setUserData } from '../actions'
import { REFRESH_TOKEN_URL, GET_USER_URL } from '../constants'

interface TopNavBarData {
    phonesNumbers:string[],
    isUserAuth:boolean,
    cartOrdersCount:number,
    userName:string,
    setUserData:(payload:string) => void
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        setUserData: (payload:string) => {dispatch(setUserData(payload))}
    }
}

const mapStateToProps = (reducer:any):TopNavBarData => {
    const { topNavBarState } = reducer.DefaultReducer
    return {
        ...topNavBarState
    }
}

const renderLoginRegister = () => {
    return (
        <div className="authBlock">
            <ActionButton
                text={"Увійти"}
                iconName=""
                action={() => {window.location.href="/login"}}
                classList={["svg-icon"]}
                iconSvgSrc="/static/svg/user.svg"
            />
            <ActionButton
                text={"Зареєструватися"}
                iconName=""
                action={() => {window.location.href="/register"}}
                classList={["svg-icon"]}
                iconSvgSrc="/static/svg/join.svg"
            />
        </div>
    )
}


const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("userName")
    window.location.href = "/"
}

const renderUserStatus = (name:string) => {
    return (
        <div className="authBlock">
            <span></span>
            <div onClick={logout} className="user-status">
                <span className="logout">Вийти</span>
            </div>
        </div>
    )
}

const renderAuth = (isUserAuth:boolean, userName:string) => {
    if (isUserAuth)
        return renderUserStatus(userName)
    else
        return renderLoginRegister()
}

const handleRefreshToken = (refreshToken:string) => {
    axios.post(REFRESH_TOKEN_URL, {
        refresh:refreshToken
    })
    .then((response) => {
        if (response.status === 200) {
            const { access } = response.data
            localStorage.setItem("accessToken", access)
            window.location.reload()
        }
    })
    .catch((error) => {
        console.log("ERROR", error)
    })
    .finally(() => {

    })
}

const getUserInfo = (
        accessToken:string,
        _refreshToken:string,
        _refreshCallBack:(refreshToken:string) => void,
        setUserDataAction:(payoad:string) => void
    ) => {
    axios.get(GET_USER_URL, {
        headers: {Authorization: "Bearer " + accessToken}
    })
    .then((response) => {
        if (response.status === 200) {
            const { fname, lname, email} = response.data
            let userName:string
            if (fname !== "")
                userName = `${fname} ${lname}`
            else
                userName = email
            localStorage.setItem("userName", userName)
            setUserDataAction(userName)
        } else if (response.status === 401) {
            // refreshCallBack(refreshToken)
            // TODO:
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            window.location.href = "/login"
        }
    })
    .catch((error) => {
        console.log("ERROR", error)
    })
    .finally(() => {

    })
}

const checkUserData = (setUserData:(payload:string) => void) => {
    const userName = localStorage.getItem("userName")
    if (!userName) {
        const accessToken = localStorage.getItem("accessToken")
        const refreshToken = localStorage.getItem("refreshToken")

        if (accessToken && refreshToken) {
            getUserInfo(
                accessToken,
                refreshToken,
                handleRefreshToken,
                setUserData
            )
        }
    } else {
        setUserData(userName)
    }
}


const TopNavBar = ({phonesNumbers, isUserAuth, cartOrdersCount, setUserData, userName}:TopNavBarData) => {
    checkUserData(setUserData)
    return (
        <div className="TopNavBar">
            <div className="left-block TopNavBar-block">
                <div className="phones">
                    <span>Аптечна довідка:</span>
                    {phonesNumbers.map((phone, index) => {
                        return (
                            <span className="phoneNumber" key={index}>{phone}</span>
                        )
                    })}
                </div>
            </div>
            <div className="right-block TopNavBar-block">
                {renderAuth(isUserAuth, userName)}
                <Link to="/profile/orders">
                    <ActionButton
                        text={`Ваш кошик: ${cartOrdersCount} товарів`}
                        iconName=""
                        iconSvgSrc="/static/svg/basket.svg"
                        action={() => {}}
                        classList={["cart", "svg-icon"]}
                    />
                </Link>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar)