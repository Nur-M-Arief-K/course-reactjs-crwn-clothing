import { useState, createContext, useEffect } from "react";

import {onAuthStateChangedListener, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";

//setup user context
export const UserContext = createContext();

export const UserProvider = ({children}) => {
    //setup the initial value for children component access to
    const [currentUser, setCurrentUser] = useState(null);

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
            console.log(user);
        }) //receive callback function; somehow 'user' is connected with googleprovider, user is just one prop out of 4 props
            //my hypothesis is that onAuthStateChanged(see firebase.utils.js) just return user prop out of the 4 props, so it can be leveraged directly, and also naturally onAuthStateChanged needs a callback

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};