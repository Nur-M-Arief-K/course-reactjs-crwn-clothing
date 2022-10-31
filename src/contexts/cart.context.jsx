/* 
    THIS IS A CONTEXT FOR OPENING/CLOSING CART-ICON IN NAVIGATION COMPONENT

*/

import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

//HELPER FUNCTION FOR removeItemFromCart below
const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //if the counter touch zero, this block of will be executed
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(
        (cartItem) => cartItem.id === cartItemToRemove.id
            ? {...cartItem, quantity: cartItem.quantity -1}
            : cartItem
    );
};

//HELPER FUNCTION FOR clearItemFromCart below
const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext(
    {
        //to open/close cart-dropdown.component
        isCartOpen: false,
        setIsCartOpen: () => {},

        //handler for cart item that has been added and function to add cart item to cart-dropdown.component
        cartItems: [], //similar as PRODUCTS object, but with a quantity prop addition
        addItemToCart: () => {},

        //removeItemFromCart
        removeItemFromCart: () => {},

        //clearItemFromCart
        clearItemFromCart: () => {},

        //for the number inside cart-icon
        cartCount: 0,

        //for the total inside checkout.component
        cartTotal: 0
    }
);

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

const cartReducer =  (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            };
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    };
};

export const CartProvider = ({children}) => {
    //REDUCER
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {cartItems, isCartOpen, cartCount, cartTotal} = state;

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}));
    };

    //Add-remove-clear item from product-card/cart-dropdown/checkout
    const addItemToCart = (productToAdd) => { //arg is added from product-card.component, passing an object of product
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems); //see above
    };

    const removeItemFromCart = (cartItemToRemove) => { //arg is added from product-card.component, passing an object of product
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems); //see above
    };

    const clearItemFromCart = (cartItemToClear) => { //arg is added from product-card.component, passing an object of product
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems); //see above
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartCount,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};