import {useContext} from "react";

import {CartContext} from "../../contexts/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext); //cartItems is an array

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                    cartItems.map((item) => 
                    <CartItem key={item.id} cartItem={item} />)
                }
            </div>
            <Button>Checkout</Button>
        </div>
    );

    //cartItems will be added when added to cart button inside product-card is clicked
};

export default CartDropdown;