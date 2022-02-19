import React from "react";
import Home from "./components/pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CartProvider from "./context/CartProvider";
import AuthProvider from "./context/AuthProvider";
import ItemListContainer from "./containers/ItemListContainer";

import Login from "./components/login/Login";

import Resgister from "./components/register/Resgister";
import ItemDetailContainer from "./containers/ItemDetailContainer";
import Cart from "./components/cart/Cart";
import Administration from "./components/admin/Administration";

import RequireAuth from "./routers/RequireAuth";

function App() {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <Administration />
                  </RequireAuth>
                }
              />
              <Route path="/" element={<Home />} />
              <Route
                path="/type/:productType"
                element={<ItemListContainer />}
              ></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route
                path="/item/:productId"
                element={<ItemDetailContainer />}
              ></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Resgister />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
