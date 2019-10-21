import { createStore, combineReducers } from "redux";
import DefaultReducer, {
    SearchReducer, HomeReducer, ProfileReducer,
    RegisterReducer, LoginReducer, NewsReducer, NewsPostReducer,
    PromotionsReducer, ProfileSettingsReducer, HistoryReducer
} from "../redusers"
import { MapReducer } from "../components/Map/Map.Reducer"

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
    MapReducer
})

const store = createStore(rootReducer);

export default store;