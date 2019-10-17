import React from 'react'
import { connect } from 'react-redux'
import MainMenuBig from '../components/MainMenuBig'
import { mainMenuOriginState } from '../redusers/initState'


class NotFoundPage extends React.Component<{}, {}> {
    render() {
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