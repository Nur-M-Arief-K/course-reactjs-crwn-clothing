import { compose, createStore, applyMiddleware } from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer";

//REDUX-PERSIST CONFIG START

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//REDUX-PERSIST CONFIG END

const middleWares = [process.env.NODE_ENV !== "production" && logger, thunk].filter(Boolean);

const composeEnhancers = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEhancers = composeEnhancers(applyMiddleware(...middleWares));

//the second arg is setter for redux default state
export const store = createStore(persistedReducer, undefined, composedEhancers);

export const persistor = persistStore(store);