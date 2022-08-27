import userReducer from "./userReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    UserReducer: userReducer
});


export default rootReducer;