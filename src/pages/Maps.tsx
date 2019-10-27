import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Map from '../components/Map'
import { MapItem } from '../components/Map/Map.types'
import MainMenuSimple from '../components/MainMenuSimple'
import { mainMenuSimpleState } from '../redusers/initState'
import Breadcrumbp from '../components/Breadcrumbp'

interface MapPageProps {
    setMaps:(mapItems:MapItem[]) => void
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        setMaps:(mapItems:MapItem[]) => {dispatch(Map.Actions.setMapsItems(mapItems))}
    }
}

class Maps extends React.Component<MapPageProps, MapPageProps> {
    constructor(props:MapPageProps, state:MapPageProps) {
        super(props, state)
        this.getMaps = this.getMaps.bind(this)

        this.getMaps()
    }

    getMaps() {
        const accessToken = localStorage.getItem("accessToken") || ""
        const { setMaps } = this.props
        Map.Helpers.getMaps(accessToken, setMaps)
    }

    render() {
        return (
            <Fragment>
                <MainMenuSimple { ...mainMenuSimpleState }/>
                <div className="header">
                    <div className="content standart-container">
                        <h1 className="title">Найближча Аптека</h1>
                        <Breadcrumbp
                            pages={[{
                                name:"Головна",
                                url:"/"
                            },{
                                name:"Найближча Аптека",
                                url:null
                            }]}
                        />
                    </div>
                </div>
                <Map.Compenent />
            </Fragment>
        )
    }
}

export default connect(null, mapDispatchToProps)(Maps)