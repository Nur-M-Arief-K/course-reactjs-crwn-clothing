import { useCallback } from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../store/cart/cart.selector";

import {CartDropdownContainer, EmptyMessage, CartItems} from "./cart-dropdown.styles";

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems); //cartItems is an array

    const navigate = useNavigate();
    const goToCheckoutHandler = useCallback(() => {
        navigate("/checkout")
    }, []);

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