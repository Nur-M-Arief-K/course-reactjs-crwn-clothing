export const loggerMiddleWare = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action); //next() is special in redux
    }

    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("currentState: ", store.getState());

    next(action);

    console.log("next state: ", store.getState()); //.getState() is function special in redux
};
