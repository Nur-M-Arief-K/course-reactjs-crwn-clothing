import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
//what is typed in the url after shop/ is derived using useParams

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/category.selector";

import { CategoryContainer, Title } from './category.styles';

const Category = () => {
    const {category} = useParams();//defined inside shop.component

    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
        <Title>{category.toUpperCase()}</Title>
        {
            isLoading ? (<Spinner />) :
            (<CategoryContainer>
                {products &&
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </CategoryContainer>)
        }
        </Fragment>
    )
};

export default Category;