import React, { Fragment } from 'react'
import './TopNav.styles.scss'
import { Link } from 'react-router-dom'
import { TopNavType } from './TopNav.types'

interface TopNavProps extends TopNavType {}

const ProileNavigation = (props:{logged:boolean, userName:string}) => {
    const { logged, userName } = props
    if (logged) {
        return (
            <li className="nav-item mr-4">
                <Link className="nav-link p-1" to="/profile/settings">
                    <i className="fas fa-user-edit"></i><span className="d-none d-lg-inline"> {userName}</span>
                </Link>
            </li>
        )
    } else {
        return (
            <Fragment>
                <li className="nav-item mr-4">
                    <Link className="nav-link p-1" to="/login">
                        <i className="fas fa-user"></i><span className="d-none d-lg-inline"> Увійти</span>
                    </Link>
                </li>
                <li className="nav-item mr-4">
                    <Link className="nav-link p-1" to="/register">
                        <i className="fas fa-user-plus"></i><span className="d-none d-lg-inline"> Зареєструватися</span>
                    </Link>
                </li>
            </Fragment>
        )
    }
}

const ButtonsList = (props:{itemCount:number, logged:boolean, userName:string}) => {
    const { itemCount, logged, userName } = props
    return (
        <ul className="navbar-nav ml-auto navbar-mini">
            <ProileNavigation logged={logged} userName={userName}/>
            <li className="nav-item cart">
                <Link className="nav-link p-1" to="/profile/orders">
                    <i className="fas fa-shopping-cart"></i><span className="d-none d-lg-inline"> Ваш кошик: </span>{itemCount}
                </Link>
            </li>
        </ul>
    )
}


const TopNavTemplate = (props:TopNavProps) => {
    const { logged, cellList, itemCount, userName } = props
    return (
        <nav className="navbar navbar-expand-lg navbar-dark info-color TopNav">
            <ul style={{cursor:"pointer"}} className="navbar-nav">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-phone"></i> {cellList.length ? cellList[0] : ""}
                    </a>
                    <div className="dropdown-menu dropdown-menu-left dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                        <h3 className="dropdown-item">Аптечна довідка</h3>
                        <hr/>
                        <div className="flex">
                            {cellList.map( (item, index) => {
                                return (
                                    <a key={`cell-item-${index}`} className="dropdown-item d-inline-block" href={`tel:${item}`}>{item}</a>
                                )
                            })}                            
                        </div>
                        <hr/>
                        <div className="p-4">
                            Графік роботи call – центру<br/>
                            У будні: 9:00 до 20:00<br/>
                            Субота: з 9:00 до 15:00<br/>
                            Неділя: вихідний<br/>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="navbar-toggler">
                <ButtonsList itemCount={itemCount} logged={logged} userName={userName}/>
            </div>
            <div className="collapse navbar-collapse mr-auto" id="navbarSupportedContent-4">
                <ButtonsList itemCount={itemCount} logged={logged} userName={userName}/>
            </div>
        </nav>
    )
}

export default TopNavTemplate