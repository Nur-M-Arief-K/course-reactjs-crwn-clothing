import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import { CartContext } from "../../contexts/cart.context";

import "./checkout.styles.scss";

const Checkout = () => {
    const {cartItems, cartTotal} = useContext(CartContext); //cartItems is the 'memory' where added item stored (an object)

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>

                <div className="header-block">
                    <span>Description</span>
                </div>

                <div className="header-block">
                    <span>Quantity</span>
                </div>

                <div className="header-block">
                    <span>Price</span>
                </div>

                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((cartItem) => 
                    <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                    //cartItem is an object of product that has been mapped (see block code above)
                )
            }
            <span className="total">${cartTotal}</span>
        </div>
    );
};

export default Checkout;