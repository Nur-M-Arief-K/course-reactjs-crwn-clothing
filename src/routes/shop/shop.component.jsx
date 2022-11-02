import { useEffect } from "react";
import {Route, Routes} from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchCategoriesStartAsync } from "../../store/categories/category.action";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesStartAsync());
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=":category" index element={<Category />}/>
        </Routes>
    );
};

export default Shop;