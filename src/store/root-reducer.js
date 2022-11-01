import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";

//RETURN a final value from all reducers
export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer
});