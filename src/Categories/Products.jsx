import React, { useMemo } from "react";
import Product from "./Product";
import products from "../data/products";
import "./Product.css";

const Products = ({ search = "" }) => {
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products
      .filter((product) => product.name.toLowerCase().includes(query))
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(query);
        const bStarts = b.name.toLowerCase().startsWith(query);

        if (aStarts !== bStarts) return aStarts ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
  }, [search]);

  return (
    <section className="products" aria-label="GreatCars products">
      {filteredProducts.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
        />
      ))}
    </section>
  );
};

export default Products;
