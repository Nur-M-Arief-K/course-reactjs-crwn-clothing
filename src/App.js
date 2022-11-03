import { Routes, Route } from "react-router-dom";
import {useEffect} from "react";

//we use useDispatch because we don't use useReducer like in the user.context, so it doesn't have dispatch
import { useDispatch } from "react-redux";

import {getCurrentUser} from "./utils/firebase/firebase.utils";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser().then(user => console.log(user)); //user is userAuth from getCurrentUser (see firebase.utils)
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />}/>
        <Route path="auth" element={<Authentication />}/>
        <Route path="checkout" element={<Checkout />}/>
      </Route>
    </Routes>
  ) 
}

export default App;
