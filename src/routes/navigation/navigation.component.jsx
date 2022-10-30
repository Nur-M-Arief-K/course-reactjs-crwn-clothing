import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";

const Navigation = () => {
    const {currentUser} = useContext(UserContext); //only need current user becausee setcurrentuser will change automactically using onauthstatechanged when user sign-in/sign-out (see user.context.js)
    const {isCartOpen} = useContext(CartContext); //only need isCartOpen, the setter will be in cart-icon.component.jsx

    //to is still there because in navigation.styles.js it's a Link

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwnLogo className="logo"/>
            </LogoContainer>
            <NavLinks>
                <NavLink to="/shop">
                    SHOP
                </NavLink>
                {
                  currentUser 
                  ? <NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink> 
                  : <NavLink to="/auth">SIGN IN</NavLink>
                }
                <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
          </NavigationContainer>
        <Outlet />
      </Fragment>
    );

    //{isCartOpen && <CartDropdown />} will evaluate both, <CartDropdown /> is a function so its will be true, and if both return true-display <CartDropdown />
  };

export default Navigation;