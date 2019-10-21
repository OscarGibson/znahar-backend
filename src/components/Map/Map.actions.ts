import { Constants, MapItem } from './Map.types'

const setMapsItems = (mapsItems:MapItem[]) => {
    return {type:Constants.SET_MAPS_ITEMS, payload:mapsItems}
}

export default {
    setMapsItems
}