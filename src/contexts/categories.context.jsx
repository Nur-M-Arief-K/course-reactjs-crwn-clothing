//THIS IS A CONTEXT TO DISPLAY PRODUCTS, IS USED IN SHOP.COMPONENT.JSX

import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext(
    {
        categoriesMap: {}
    }
);

export const CategoriesProvider = ({children}) => { //somehow children is connected to its children component in index.js in oreder to render its children component
    const [categoriesMap, setCategoriesMap] = useState({});

    //WILL RUN ON MOUNT
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments(); //categoryMap {hats: [], jackets: [], etc}
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        };
        getCategoriesMap();
    }, []);

    //USED ONLY ONCE TO ADD SHOP_DATA.JS TO FIREBASE-FIRESTORE
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []); //categories is the collection key, SHOP_DATA is the objectToAdd which will be passed to firebase.utils.js

    const value ={categoriesMap};
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
};