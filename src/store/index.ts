import { createStore, combineReducers } from "redux";
import DefaultReducer, {
    SearchReducer, HomeReducer, ProfileReducer,
    RegisterReducer, LoginReducer, NewsReducer, NewsPostReducer,
    PromotionsReducer, ProfileSettingsReducer
} from "../redusers";

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
    ProfileSettingsReducer
})

const store = createStore(rootReducer);

export default store;