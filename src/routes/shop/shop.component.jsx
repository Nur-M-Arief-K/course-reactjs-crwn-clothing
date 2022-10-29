import { useContext } from "react";

import CategoryPreview from "../../components/category-preview/category-preview.component";

import { CategoriesContext } from "../../contexts/categories.context";

import "./shop.component.scss"

const Shop = () => {
    const {categoriesMap} = useContext(CategoriesContext); //categoriesMap is categoryMap {hats: [], jackets: [], etc}
    return (
        <div className="shop-container" >
            {
                Object.keys(categoriesMap).map(title => { //Object.keys is iterating keys of an object, NOT INCLUDING ITS VALUE!
                    const products = categoriesMap[title]; //returning the keys and its value
                    return <CategoryPreview key={title} title={title} products={products} />
                })
            }
            
        </div>
    );
};

export default Shop;