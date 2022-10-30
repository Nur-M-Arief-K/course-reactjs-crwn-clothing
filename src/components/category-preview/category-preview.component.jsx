import {Link} from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import { CategoryPreviewContainer, Title, Preview } from "./category-preview.styles";

const CategoryPreview = ({title, products}) => { //will receice args from shop.component
    return (
        <CategoryPreviewContainer>
            <Title>
                <Link to={title} className="title">{title.toUpperCase()}</Link>
            </Title>
            <Preview className="preview"> 
                {
                    products
                        .filter((_, idx) => idx < 4)
                        .map((product => 
                            <ProductCard key={product.id} product={product}/>
                        ))
                }
            </Preview>
        </CategoryPreviewContainer>
    )
};

export default CategoryPreview;