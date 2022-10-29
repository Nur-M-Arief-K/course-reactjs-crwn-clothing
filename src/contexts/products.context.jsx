//THIS IS A CONTEXT TO DISPLAY PRODUCTS, IS USED IN SHOP.COMPONENT.JSX

import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductsContext = createContext(
    {
        products: []
    }
);

export const ProductsProvider = ({children}) => { //somehow children is connected to its children component in index.js in oreder to render its children component
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
        };
        getCategoriesMap();
    }, []);

    //USED ONLY ONCE TO ADD SHOP_DATA.JS TO FIREBASE-FIRESTORE
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []); //categories is the collection key, SHOP_DATA is the objectToAdd which will be passed to firebase.utils.js

    const value ={products};
    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    );
};