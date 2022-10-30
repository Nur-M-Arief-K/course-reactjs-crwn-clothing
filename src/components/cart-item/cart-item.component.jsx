import { CartItemContainer, Img, ItemDetails, Name, Price } from "./cart-item.styles";

const CartItem = ({cartItem}) => { //receive object of the product that has been added from shop.component.jsx
    const {name, imageUrl, price, quantity} = cartItem;    

    return (
        <CartItemContainer >
            <Img src={imageUrl} alt={`${name}`}/>
            <ItemDetails >
                <Name>{name}</Name>
                <Price >
                    {quantity} x ${price}
                </Price>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;