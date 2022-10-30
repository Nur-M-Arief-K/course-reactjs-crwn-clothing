import {useContext} from "react";

import {CartContext} from "../../contexts/cart.context";

import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {CartDropdownContainer, EmptyMessage, CartItems} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext); //cartItems is an array

    //setup navigate to function, we don't use <Link /> because <Button /> is our custom component that we need to stylize it
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate("/checkout")
    };

    return (
        <CartDropdownContainer >
            <CartItems>
                {
                    cartItems.length ? 
                    (cartItems.map((item) => 
                    <CartItem key={item.id} cartItem={item} />)) :
                    (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>Checkout</Button>
        </CartDropdownContainer>
    );

    //cartItems will be added when added to cart button inside product-card is clicked
};

export default CartDropdown;