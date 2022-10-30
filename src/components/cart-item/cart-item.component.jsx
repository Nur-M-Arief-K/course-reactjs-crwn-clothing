import { CartItemContainer, ItemDetails } from './cart-item.styles';

const CartItem = ({cartItem}) => { //receive object of the product that has been added from shop.component.jsx
    const {name, imageUrl, price, quantity} = cartItem;    

    return (
        <CartItemContainer>
        <img src={imageUrl} alt={`${name}`} />
        <ItemDetails>
            <span>{name}</span>
            <span>
            {quantity} x ${price}
            </span>
        </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;