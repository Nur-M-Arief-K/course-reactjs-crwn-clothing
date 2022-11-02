import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

//CUSTOM MIDDLEWARE
const loggerMiddleWare = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action); //next() is special in redux
    }

    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("currentState: ", store.getState());

    next(action);

    console.log("next state: ", store.getState()); //.getState() is function special in redux
};

const middleWares = [loggerMiddleWare];

const composeEhancers = compose(applyMiddleware(...middleWares));

//the second arg is setter for redux default state
export const store = createStore(rootReducer, undefined, composeEhancers);