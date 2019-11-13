import React from 'react'
import { MapData, MapItem } from './Map.types'
import './Map.styles.scss'
// import { IMAGES_BACKEND } from '../../constants';


const MapItemTemplate = (props:MapItem) => {
    const { name, description, photo } = props
    return (
        <div className="MapItemTemplate col-md-3 col-sm-6 col-xs-12">
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
            </div>
        </div>
    )
}

export default MapTemplate