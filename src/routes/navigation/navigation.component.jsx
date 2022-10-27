import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";

//for user purpose
import { UserContext } from "../../contexts/user.context";
//for user purpose

import "./navigation.styles.scss";

const Navigation = () => {

    //for context purpose, taking current user value if something changed (user login or logout from sign-in-form component)
    const {currentUser} = useContext(UserContext);
    console.log(currentUser);
    //for context purpose

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
                <Link className="nav-link" to="/auth">
                    SIGN IN
                </Link>
            </div>
            </div>
        <Outlet />
      </Fragment>
    )
  };

export default Navigation;