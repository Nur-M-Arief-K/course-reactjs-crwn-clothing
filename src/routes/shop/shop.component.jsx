import { useEffect } from "react";
import {Route, Routes} from "react-router-dom";
import { useDispatch } from "react-redux";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategoriesMap } from "../../store/categories/category.action";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {
    const dispatch = useDispatch();

     //WILL RUN ON MOUNT
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments(); //categoryMap {hats: [], jackets: [], etc}

            //CATEGORIES REDUX
            dispatch(setCategoriesMap(categoryMap));
        };
        getCategoriesMap();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=":category" index element={<Category />}/>
        </Routes>
    );
};

export default Shop;