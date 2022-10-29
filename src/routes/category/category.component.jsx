import { useContext, useState, useEffect } from "react";

import { useParams } from "react-router-dom";
//what is typed in the url after shop/ is derived using useParams

import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../contexts/categories.context";

import "./category.styles.scss";

const Category = () => {
    const {category} = useParams();//defined inside shop.component
    const {categoriesMap} = useContext(CategoriesContext);

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <div className="category-container">
            {
                products && 
                products.map((product) => <ProductCard key={product.id} product={product} />)
            }
        </div>
    )
};

export default Category;