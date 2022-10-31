/* 
    THIS IS A CONTEXT FOR TRACKING CHANGES IN AUTHENTICATION, 
    IS ONLY USED IN NAVIGATION COMPONENT BECAUSE SIGN-IN AND SIGN-UP DON'T NEED IT AS THERE'S A ONAUTHSTATECHANGED FUNCTION PROVIDED BY FIREBASEE 
*/

import { createContext, useEffect, useReducer } from "react";

import {onAuthStateChangedListener, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";

import { createAction } from "../utils/reducer/reducer.utils";

//setup user context
export const UserContext = createContext(
    {
        currentUser: null,
        setCurrentUser: () => {}
    }
);

//SETUP USER REDUCER (USEREDUCER)

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
};

const userReducer = (state, action) => {
    console.log('dispatch');
    console.log(action);
    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            //return an object, update specific aspect of state while the rest of props still the same
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    };
};

const INITIAL_STATE = {
    currentUser: null
};

export const UserProvider = ({children}) => {
    //setup the initial value for children component access to
    // const [currentUser, setCurrentUser] = useState(null);


    //setup for use reducer
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE); //receive the reducer and initial state which will be passed to userreducer, while the action will be passed from dispatch
    
    const {currentUser} = state; //currentUser is a prop of state inside INITIAL_STATE, see above
    console.log(currentUser);
    //state is the state that currently stored, dispatch is a method if we want to change the state

    //setup for dispatch for userReducer which will be passed inside action param in userReducer
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    };



    //setup value to be passed in <userContext.Provider /> below, MUST BE AN OBJECT!    
    const value = {currentUser, setCurrentUser};

    //setup for re-render function if auth stream get changed, using onAuthStateChangedListener as an alias of onAuthStateChanged 
    //by leveraging this function, we don't need to spread setCurrentUser anymore because sign-in/sign-up/sign-out is automatically connected to onAuthStateChanged that we leverage in this file using alias onAuthStateChangedListener
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                //for CRUD action in firestore, validation if the user exist or not is located inside createUserDocumentFromAuth(see firebase.uitls.js)
                createUserDocumentFromAuth(user);
            };
            setCurrentUser(user); //setCurrentUser above
        }) //receive callback function; somehow 'user' is connected with googleprovider, user is just one prop out of 4 props
            //my hypothesis is that onAuthStateChanged(see firebase.utils.js) just return user prop out of the 4 props, so it can be leveraged directly, and also naturally onAuthStateChanged needs a callback

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};