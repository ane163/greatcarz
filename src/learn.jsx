import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Nav from "./Home/Nav";
import Home from "./Home/Home";
import Categories from "./Categories/Categories";
import Product from "./Categories/Product";
import Explore from "./Categories/Explore";
import ProductDetails from "./Categories/ProductDetails";
import Cart from "./Cart/Cart";

import products from "./Home/data";

const App = () => {
  const [category, setCategory] = useState("cars");
  const [search, setSearch] = useState("");

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

              <h2>Selected Category: {category}</h2>

              <div className="products">
                {products
                  .filter(
                    (item) =>
                      item.category === category &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (
                    <Product
                      key={item.id}
                      product={item}
                      id={item.id}
                      image={item.image}
                      name={item.name}
                      price={item.price}

                    />
                  ))}
              </div>
            </>
          }
        />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;