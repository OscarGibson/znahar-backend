import { MapData, Constants, MapItem } from "./Map.types"
import { MapInitState } from "./Map.InitState"

export const MapReducer = (state:MapData = MapInitState, action:any):MapData => {
    if (action.type === Constants.SET_MAPS_ITEMS) {
        const mapsItems:MapItem[] = action.payload
        return {
            maps:mapsItems
        }
    }
    return state
}