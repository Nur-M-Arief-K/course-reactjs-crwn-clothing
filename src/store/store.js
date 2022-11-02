import { compose, createStore, applyMiddleware } from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

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

//REDUX-PERSIST CONFIG START

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//REDUX-PERSIST CONFIG END

const middleWares = [loggerMiddleWare];

const composeEhancers = compose(applyMiddleware(...middleWares));

//the second arg is setter for redux default state
export const store = createStore(persistedReducer, undefined, composeEhancers);

export const persistor = persistStore(store);