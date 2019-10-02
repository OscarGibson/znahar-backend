import { createStore, combineReducers } from "redux";
import DefaultReducer, {
    SearchReducer, HomeReducer, ProfileReducer,
    RegisterReducer, LoginReducer
} from "../redusers";

const rootReducer = combineReducers({
    DefaultReducer,
    SearchReducer,
    HomeReducer,
    ProfileReducer,
    RegisterReducer,
    LoginReducer
})

const store = createStore(rootReducer);

export default store;