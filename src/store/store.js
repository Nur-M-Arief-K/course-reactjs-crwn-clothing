import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const middleWares = [logger];

const composeEhancers = compose(applyMiddleware(...middleWares));

//the second arg is setter for redux default state
export const store = createStore(rootReducer, undefined, composeEhancers);