import { compose, createStore, applyMiddleware } from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
//redux-saga replace redux-thunk
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

//REDUX-PERSIST CONFIG START

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//REDUX-SAGA MIDDLEWARE SETUP
const sagaMiddleware = createSagaMiddleware();

const middleWares = [process.env.NODE_ENV !== "production" && logger, sagaMiddleware].filter(Boolean);

const composeEnhancers = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEhancers = composeEnhancers(applyMiddleware(...middleWares));

//the second arg is setter for redux default state
export const store = createStore(persistedReducer, undefined, composedEhancers);

//REDUX-SAGA
sagaMiddleware.run(rootSaga);

//REDUX-PERSIST 
export const persistor = persistStore(store);