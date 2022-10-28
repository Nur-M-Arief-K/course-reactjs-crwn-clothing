import {useContext} from "react";

import {CartContext} from "../../contexts/cart.context";

import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext); //cartItems is an array

    //setup navigate to function, we don't use <Link /> because <Button /> is our custom component that we need to stylize it
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate("/checkout")
    };

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                    cartItems.map((item) => 
                    <CartItem key={item.id} cartItem={item} />)
                }
            </div>
            <Button onClick={goToCheckoutHandler}>Checkout</Button>
        </div>
    );

    //cartItems will be added when added to cart button inside product-card is clicked
};

export default CartDropdown;