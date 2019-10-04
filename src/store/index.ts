import { createStore, combineReducers } from "redux";
import DefaultReducer, {
    SearchReducer, HomeReducer, ProfileReducer,
    RegisterReducer, LoginReducer, NewsReducer, NewsPostReducer,
    PromotionsReducer
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
    PromotionsReducer
})

const store = createStore(rootReducer);

export default store;