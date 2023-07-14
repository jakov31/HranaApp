import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import Header from "./components/Layout/Header";
// import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Home from "./components/Layout/Home";
import NotFound from "./components/UI/Navigate";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home showCartHandler={showCartHandler} />} />
        {cartIsShown && (
          <Route
            path="/ShopCart"
            element={<Cart onClose={hideCartHandler} />}
          />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main> */}
    </CartProvider>
  );
}

export default App;
