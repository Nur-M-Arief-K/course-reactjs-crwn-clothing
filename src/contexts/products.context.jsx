//THIS IS A CONTEXT TO DISPLAY PRODUCTS, IS USED IN SHOP.COMPONENT.JSX

import { createContext, useState } from "react";

import PRODUCTS from "../shop-data.json";

export const ProductsContext = createContext(
    {
        products: PRODUCTS
    }
);

export const ProductsProvider = ({children}) => { //somehow children is connected to its children component in index.js in oreder to render its children component
    const [products, setProducts] = useState(PRODUCTS);

    const value ={products};
    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    );
};