import { Fragment } from "react";
import { useSelector } from "react-redux";

import {selectCategoriesMap} from "../../store/categories/category.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map(title => { //Object.keys is iterating keys of an object, NOT INCLUDING ITS VALUE!
                    const products = categoriesMap[title]; //returning the keys and its value
                    return <CategoryPreview key={title} title={title} products={products} />
                })
            }
            
        </Fragment>
    );
};

export default CategoriesPreview;