export interface MapItem {
    uuid:string,
    name:string,
    description:string,
    image:string
}

export interface MapData {
    maps:MapItem[]
}

export const Constants = {
    SET_MAPS_ITEMS:"SET_MAPS_ITEMS"
}