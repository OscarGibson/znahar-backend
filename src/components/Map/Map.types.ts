export interface MapItem {
    uuid:string,
    name:string,
    description:string,
    photo:string,
    latitude:number,
    longtitude:number
}

export interface MapData {
    maps:MapItem[]
}

export const Constants = {
    SET_MAPS_ITEMS:"SET_MAPS_ITEMS"
}