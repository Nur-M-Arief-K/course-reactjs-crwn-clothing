import { useState, createContext, useEffect } from "react";

import {onAuthStateChangedListener} from "../utils/firebase/firebase.utils";

//setup user context
export const UserContext = createContext();

export const UserProvider = ({children}) => {
    //setup the initial value for children component access to
    const [currentUser, setCurrentUser] = useState(null);

    //setup value to be passed in <userContext.Provider /> below, MUST BE AN OBJECT!    
    const value = {currentUser, setCurrentUser};

    //setup for re-render function if auth stream get changed, using onAuthStateChangedListener as an alias of onAuthStateChanged 
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user);
        }) //receive callback function; somehow 'user' is connected with googleprovidr, user is just one prop out of 4 props

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};