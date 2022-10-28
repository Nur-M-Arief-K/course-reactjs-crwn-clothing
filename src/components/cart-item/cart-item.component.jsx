import "./cart-item.styles.scss";

const CartItem = ({cartItem}) => { //receive object of the product that has been added from shop.component.jsx
    const {name, imageUrl, price, quantity} = cartItem;    

    return (
        <div className="cart-item-container">
            <img  src={imageUrl} alt={`${name}`}/>
            <div className="item-details">
                <span className="name">{name}</span>
                <span className="price">
                    {quantity} x ${price}
                </span>
            </div>
        </div>
    );
};

export default CartItem;