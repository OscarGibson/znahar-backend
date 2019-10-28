export interface MapItem {
    uuid:string,
    name:string,
    description:string,
    photo:string
}

export interface MapData {
    maps:MapItem[]
}

export const Constants = {
    SET_MAPS_ITEMS:"SET_MAPS_ITEMS"
}