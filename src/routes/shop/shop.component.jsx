import { useContext, Fragment } from "react";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../contexts/categories.context";

import "./shop.component.scss"

const Shop = () => {
    const {categoriesMap} = useContext(CategoriesContext); //categoriesMap is categoryMap {hats: [], jackets: [], etc}
    return (
        <Fragment >
            {
                Object.keys(categoriesMap).map(title => ( //Object.keys is iterating keys of an object, NOT INCLUDING ITS VALUE!
                    <Fragment key={title}>
                        <h2>{title}</h2>
                        <div className="products-container">
                            {categoriesMap[title].map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            }
                        </div>
                    </Fragment>
                ))
            }
            
        </Fragment>
    );
};

export default Shop;