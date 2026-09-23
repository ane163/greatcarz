import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import "./Product.css";

function Product({ id, image, name, price }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ id, image, name, price });
  };

  return (
    <article className="card">
      <Link to={`/car/${id}`} className="product-link">
        <img src={image} alt={name} loading="lazy" />
        <h3>{name}</h3>
        <h4>{price}</h4>
      </Link>

      <button type="button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </article>
  );
}

export default Product;
