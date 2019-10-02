import React from 'react'
import { connect } from 'react-redux'
import { IHomePage } from '../types/Interfaces'
import MainMenuBig from '../components/MainMenuBig'


class NotFoundPage extends React.Component<IHomePage, IHomePage> {
    render() {
        const {
            mainMenuOriginState
        } = this.props
        return (
            <div className="NotFoundPage">
                <MainMenuBig {...mainMenuOriginState}/>
                <h1 className="code">404</h1>
                <h2 className="text">Сторінки не існує</h2>
            </div>
        )
    }
}

export default connect()(NotFoundPage)