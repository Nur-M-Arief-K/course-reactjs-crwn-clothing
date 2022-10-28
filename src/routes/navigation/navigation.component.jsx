import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import "./navigation.styles.scss";

const Navigation = () => {
    const {currentUser} = useContext(UserContext); //only need current user becausee setcurrentuser will change automactically using onauthstatechanged when user sign-in/sign-out (see user.context.js)
    const {isCartOpen} = useContext(CartContext); //only need isCartOpen, the setter will be in cart-icon.component.jsx

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <CrwnLogo className="logo"/>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                {
                  currentUser 
                  ? <span className="nav-link" onClick={signOutUser}>SIGN OUT</span> 
                  : <Link className="nav-link" to="/auth">SIGN IN</Link>
                }
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
          </div>
        <Outlet />
      </Fragment>
    );

    //{isCartOpen && <CartDropdown />} will evaluate both, <CartDropdown /> is a function so its will be true, and if both return true-display <CartDropdown />
  };

export default Navigation;