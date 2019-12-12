import React from 'react'
import { MapData, MapItem } from './Map.types'
import './Map.styles.scss'
import GoogleMapReact from 'google-map-react'
import { GOOGLE_MAPS_API_KEY } from '../../constants'
import { mainMenuSimpleState } from '../../redusers/initState'


const MapPoint = (props:{lat:number, lng:number}) => {
    return (
    <div className="MapPoint">
        <i className="fas fa-map-marker-alt map-marker"></i>
    </div>
    )
}

const defaultCenter = {
    lat:49.8341743,
    lng:24.0043998
}

const MapItemTemplate = (props:MapItem) => {
    const moveToMap = (latitude:number, longtitude:number) => {
        if (latitude && longtitude)
            window.open(`https://www.google.com.ua/maps/@${latitude},${longtitude},17z?hl=ua`,'_blank')
    }
    const { name, description, photo, latitude, longtitude } = props
    return (
        <div onClick={() => {moveToMap(latitude, longtitude)}} className="MapItemTemplate col-md-3 col-sm-6 col-xs-12" style={{cursor:"pointer"}}>
            <img className="mb-2" src={`${photo}`} alt="map"/>
            <p className="map-name m-auto">{name}</p>
            <p className="map-description m-auto">{description}</p>
        </div>
    )
}

const MapTemplate = (props:MapData) => {
    const { maps } = props
    return (
        <div className="row  standart-container MapTemplate">
            {maps.map( (mapItem, index) => {
                return (
                    <MapItemTemplate key={`map-item-${index}`} {...mapItem}/>
                )
            })}
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                    defaultCenter={defaultCenter}
                    defaultZoom={13}
                    >
                    {maps.map( (mapItem, index ) => {
                        const { latitude, longtitude } = mapItem
                        if (latitude && longtitude)
                            return (
                                <MapPoint
                                    key={`map-point-${index}`}
                                    lat={latitude}
                                    lng={longtitude}
                                />
                            )    
                    })}
                </GoogleMapReact>
            </div>
        </div>
    )
}

export default MapTemplate