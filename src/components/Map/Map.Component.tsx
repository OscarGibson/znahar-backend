import React from 'react'
import { connect } from 'react-redux'
import { MapData } from './Map.types'
import MapTemplate from './Map.Template'

interface MapProps extends MapData {

}

const mapStateToProps = (reducers:any):MapData => {
    const { MapReducer } = reducers
    console.log(MapReducer, reducers)
    return {
        ...MapReducer
    }
}

class MapComponent extends React.Component<MapProps, MapProps> {
    constructor(props:MapProps, state:MapProps) {
        super(props, state)
    }

    render() {
        const { maps } = this.props
        return (
            <MapTemplate maps={maps}/>
        )
    }
}

export default connect(mapStateToProps)(MapComponent)