import C from './TopNav.constants'

export default {
    plusItem:(delta:number) => {
        return {type:C.PLUS_ITEM, payload:delta}
    },
    minusItem:(delta:number) => {
        return {type:C.MILUS_ITEM, payload:delta}
    },
    nullItem:() => {
        return {type:C.NULL_ITEM, payload:{}}
    },
    setCellList:(cellList:string[]) => {
        return {type:C.SET_CELL_LIST, payload:cellList}
    },
    setLogin:() => {
        return {type:C.SET_LOGIN, payload:{}}
    },
    setLogout:() => {
        return {type:C.SET_LOGOUT, payload:{}}
    },
    setUserName:(userName:string) => {
        return {type:C.SET_USER_NAME, payload:userName}
    }
}