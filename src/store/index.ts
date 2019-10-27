import { createStore, combineReducers } from "redux";
import DefaultReducer, {
    SearchReducer, HomeReducer, ProfileReducer,
    RegisterReducer, LoginReducer, NewsReducer, NewsPostReducer,
    PromotionsReducer, ProfileSettingsReducer, HistoryReducer
} from "../redusers"
import { MapReducer } from "../components/Map/Map.Reducer"
import { PaginatorReducer } from "../components/Paginator/Paginator.reducer"

const rootReducer = combineReducers({
    DefaultReducer,
    SearchReducer,
    HomeReducer,
    ProfileReducer,
    RegisterReducer,
    LoginReducer,
    NewsReducer,
    NewsPostReducer,
    PromotionsReducer,
    ProfileSettingsReducer,
    HistoryReducer,
    MapReducer,
    PaginatorReducer
})

const store = createStore(rootReducer);

export default store;