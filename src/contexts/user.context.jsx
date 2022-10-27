import { useState } from "react";
import { createContext,  } from "react";

//setup user context
export const UserContext = createContext();

export const UserProvider = ({children}) => {
    //setup the initial value for children component access to
    const [currentUser, setCurrentUser] = useState(null);

    //setup value to be passed in <userContext.Provider /> below, MUST BE AN OBJECT!    
    const value = {currentUser, setCurrentUser};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};