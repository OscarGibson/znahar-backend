import axios from 'axios'
import { GET_MAPS_URL } from '../../constants'
import { MapItem } from './Map.types'

const getMaps = (accessToken:string, setMaps:(mapItems:MapItem[]) => void) => {
    axios.get(GET_MAPS_URL, {
        // headers: {Authorization: "Bearer " + accessToken}
    })
    .then((response) => {
        if (response.status === 200) {
            const maps = response.data
            setMaps(maps)
        }
    })
    .catch((error) => {
        console.log("ERROR", error)
    })
    .finally(() => {  
    })
}

export const Helpers = {
    getMaps
}