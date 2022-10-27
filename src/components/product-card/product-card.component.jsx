import Button from "../button/button.component";

import "./product-card.styles.scss";

const ProductCard = ({product}) => { //produc param is received from shop.component.jsx; the param is an object-list of product
    const {name, price, imageUrl} = product;
    
    return (
    
    <div className="product-card-container">
        <img src={imageUrl} alt={`${name}`} />
        <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <Button buttonType="inverted">Add item to cart</Button>
    </div>

    )
};

export default ProductCard;