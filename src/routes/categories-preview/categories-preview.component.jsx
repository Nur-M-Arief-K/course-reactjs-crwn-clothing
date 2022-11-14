import { useContext, Fragment } from "react";

import CategoryPreview from "../../components/category-preview/category-preview.component";

import { CategoriesContext } from "../../contexts/categories.context";

import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
    const {categoriesMap, loading} = useContext(CategoriesContext); //categoriesMap is categoryMap {hats: [], jackets: [], etc}
    return (
        <Fragment>
        {
            loading ? <Spinner /> :
            (
                Object.keys(categoriesMap).map(title => { //Object.keys is iterating keys of an object, NOT INCLUDING ITS VALUE!
                    const products = categoriesMap[title]; //returning the keys and its value
                    return <CategoryPreview key={title} title={title} products={products} />
                })
            )
        }
        </Fragment>
    );
};

export default CategoriesPreview;