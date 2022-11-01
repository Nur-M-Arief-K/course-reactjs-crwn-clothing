import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";

//RETURN a final value from all reducers
export const rootReducer = combineReducers({
    user: userReducer
});