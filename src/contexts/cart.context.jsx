/* 
    THIS IS A CONTEXT FOR OPENING/CLOSING CART-ICON IN NAVIGATION COMPONENT

*/

import { createContext, useState, useEffect } from "react";

//HELPER FUNCTION WHEN A CART ITEM IS ADDED, ARGS IS RECEIVED THROUGH addItemToCart function below (inside CartProvider component);
const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id); //check if added cart item already exist inside cart-dropdown 
    //cartItem is an object

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
        addItemToCart: () => {},

        //for the number inside cart-icon
        cartCount: 0
    }
);

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false); //for toggle cart dropdown when click cart-icon, leveraged inside navigation.component
    const [cartItems, setCartItems] = useState([]); //for tracking something cart item, when it is added-reduce-removed
    const [cartCount, setCartCount] = useState(0); //for the number inside cart-icon

    //for re-render the number inside cart-icon when cartItems changed

    useEffect(() => {
        const newCartItem = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartItem);
    }, [cartItems]); //cartItems is a dependency, which means if cartItems changed useeffect will re-render

    const addItemToCart = (productToAdd) => { //arg is added from product-card.component, passing an object of product
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};