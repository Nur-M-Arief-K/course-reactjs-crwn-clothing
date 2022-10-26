import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";

const Shop = () => {
  return (
    <div>
      <h1>Hi I'm the shop page</h1>
    </div>
  )
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="shop" element={<Shop />}/>
      </Route>
    </Routes>
  ) 
}

export default App;
