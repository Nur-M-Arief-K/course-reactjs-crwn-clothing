/* 
    THIS IS A CONTEXT FOR OPENING/CLOSING CART-ICON IN NAVIGATION COMPONENT

*/

import { createContext, useState } from "react";

export const CartContext = createContext(
    {
        isCartOpen: false,
        setIsCartOpen: () => {}
    }
);

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const value = {
        isCartOpen,
        setIsCartOpen
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};