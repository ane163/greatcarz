import React, { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Nav from "./Home/Nav";
import Home from "./Home/Home";
import Categories from "./Categories/Categories";
import Product from "./Categories/Product";
import Explore from "./Categories/Explore";
import ProductDetails from "./Categories/ProductDetails";
import Cart from "./Cart/Cart";
import Admin from "./Admin/Admin";
import Login from "./Admin/Login";
import Register from "./Admin/Register";
import Checkout from "./Categories/Checkout";
import OrderSuccess from "./Categories/OrderSuccess";
import User from "./About/User";
import Products from "./Categories/Products";
import About from "./About/About";
import Contact from "./About/Contact";
import Footer from "./Footer/Footer";
import products from "./data/products";

const App = () => {
  const [category, setCategory] = useState("cars");
  const [search, setSearch] = useState("");

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products
      .filter((product) => product.category === category)
      .filter((product) => product.name.toLowerCase().includes(query))
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(query);
        const bStarts = b.name.toLowerCase().startsWith(query);

        if (aStarts !== bStarts) return aStarts ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
  }, [category, search]);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdminLoggedIn = user?.role === "admin";

  return (
    <div>
      <Nav search={search} setSearch={setSearch} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Explore />
              <Categories setCategory={setCategory} />

              <h2 style={{ textAlign: "center", margin: "20px 0" }}>
                Selected Category: {category}
              </h2>

              <div className="products">
                {visibleProducts.map((product) => (
                  <Product
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                  />
                ))}
              </div>
            </>
          }
        />

        <Route path="/user" element={<User />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products search={search} />} />
        <Route path="/car/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<OrderSuccess />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            isAdminLoggedIn ? <Admin /> : <Navigate to="/login" replace />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
