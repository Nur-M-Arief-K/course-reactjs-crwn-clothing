/* 
    THIS IS A CONTEXT FOR OPENING/CLOSING CART-ICON IN NAVIGATION COMPONENT

*/

import { createContext, useState } from "react";

//HELPER FUNCTION WHEN A CART ITEM IS ADDED, ARGS IS RECEIVED THROUGH addItemToCart function below (inside CartProvider component);
const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id); //check if added cart item already exist inside cart-dropdown 

    //if existingCartItem found, run block of code below
    if (existingCartItem) {
        return cartItems.map(
            (cartItem) => cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity +1}
                : cartItem
        );
    };

    //if existingCartItem wasn't found
    return [...cartItems, {...productToAdd, quantity: 1}];
};

export const CartContext = createContext(
    {
        //to open/close cart-dropdown.component
        isCartOpen: false,
        setIsCartOpen: () => {},

        //handler for cart item that has been added and function to add cart item to cart-dropdown.component
        cartItems: [], //similar as PRODUCTS object, but with a quantity prop addition
        addItemToCart: () => {}
    }
);

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => { //arg is added from product-card.component, passing an object of products list 
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};