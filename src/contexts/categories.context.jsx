//THIS IS A CONTEXT TO DISPLAY PRODUCTS, IS USED IN SHOP.COMPONENT.JSX

import { createContext, useState, useEffect } from "react";

import { gql, useQuery } from "@apollo/client";

export const CategoriesContext = createContext(
    {
        categoriesMap: {}
    }
);

const COLLECTIONS = gql`
    query GetCollections {
        collections {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
` 

export const CategoriesProvider = ({children}) => { //somehow children is connected to its children component in index.js in oreder to render its children component
    const {loading, error, data} = useQuery(COLLECTIONS)
    
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        if (data) {
            const {collections} = data;
            const collectionMap = collections.reduce((acc, collection) => {
                const {title, items} = collection;
                acc[title.toLowerCase()] = items;
                return acc;
            }, {});
            setCategoriesMap(collectionMap);
        };
    }, [data]);
    
    //USED ONLY ONCE TO ADD SHOP_DATA.JS TO FIREBASE-FIRESTORE
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []); //categories is the collection key, SHOP_DATA is the objectToAdd which will be passed to firebase.utils.js

    const value ={categoriesMap, loading};
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
};