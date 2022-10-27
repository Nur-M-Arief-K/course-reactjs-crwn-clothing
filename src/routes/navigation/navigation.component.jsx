import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";

import { signOutUser } from "../../utils/firebase/firebase.utils";

//for context purpose
import { UserContext } from "../../contexts/user.context";
//for context purpose

import "./navigation.styles.scss";

const Navigation = () => {

    //for context purpose, taking current user value if something changed (user login or logout from sign-in-form component)
    const {currentUser, setCurrentUser} = useContext(UserContext);
    // console.log(currentUser);
    //for context purpose

    const signOutHandler = async () => {
      await signOutUser(); //will return undefined if successfully sign out
      setCurrentUser(null); //set user context currentUser to null
    }

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
                  ? <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span> 
                  : <Link className="nav-link" to="/auth">SIGN IN</Link>
                }
            </div>
            </div>
        <Outlet />
      </Fragment>
    )
  };

export default Navigation;