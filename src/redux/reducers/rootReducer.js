import { combineReducers } from "redux";
import handleUser from "../reducers/useReducer";

const rootReducer = combineReducers({
    user: handleUser
})

export default rootReducer;