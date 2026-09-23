import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const car = useMemo(
    () => products.find((product) => String(product.id) === String(id)),
    [id]
  );

  if (!car) {
    return (
      <div className="product-details">
        <div className="product-details-card">
          <div className="details">
            <h1>Vehicle not found</h1>
            <p>The vehicle you are looking for is not in our catalogue.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="product-details-card">
        <img src={car.image} alt={car.name} />

        <div className="details">
          <p className="product-category">{car.category}</p>
          <h1>{car.name}</h1>
          <h2>{car.price}</h2>

          <p>
            Explore this GreatCars catalogue listing and add it to your cart
            when you are ready to continue.
          </p>

          <p>
            <strong>Category:</strong> {car.category}
          </p>

          <button type="button">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
