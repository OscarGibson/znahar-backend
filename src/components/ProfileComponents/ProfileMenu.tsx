import React from 'react'
import { Link } from 'react-router-dom'

const activeClass = "menu-item bd-callout"

const pagesList = [
    ["orders", "Мої бронювання"],
    // ["discounts", "Ваучери на знижку"],
    ["settings", "Налаштування"],
    ["history", "Історія бронювань"]
]

const isActive = (pageName:string, currentPageName:string):string => {
    return pageName === currentPageName ? activeClass : "menu-item"
}

const logout = () => {
    localStorage.removeItem("accessToken")
    window.location.href = "/login"
}

const ProfileMenu = (props:{currentPageName:string}) => {
    const { currentPageName } = props
    return (
        <div className="menu">
            <ul>
                {pagesList.map( (item, index) => {
                    return (
                        <li key={`profile-menu-item-${index}`} className={isActive(item[0], currentPageName)}><Link to={`/profile/${item[0]}`}>{item[1]}</Link></li>
                    )
                })}
                <hr/>
                <li className="menu-item" onClick={logout}>Вийти</li>
            </ul>
        </div>
    )
}

export default ProfileMenu