import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

//extract value off redux root, in this case root-reducer.js
import { useSelector } from "react-redux";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { CartContext } from "../../contexts/cart.context";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {
    //Receive the whole redux root final value inside root-reducer.js to state, it's an object
    const currentUser = useSelector(selectCurrentUser);

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