import React, { useContext } from "react";
import { CartContext } from "../Categories/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {

  const { 
    cart, 
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext);


  const totalPrice = cart.reduce((total, item) => {
  const price = Number(
    String(item.price).replace(/[$,\s]/g, "")
  );

  return total + price * item.quantity;
}, 0);


  return (

    <div className="cart-container">

      <h1 className="cart-title">
        Your Cart
      </h1>


      {
        cart.length === 0 ? (

          <h2 className="empty-cart">
            Your cart is empty
          </h2>

        ) : (

          <>

            <div className="cart-items">

              {
                cart.map(item => (

                  <div className="cart-card" key={item.id}>

<img className="cart-image"
  src={item.image}
  alt={item.name}
/>


                    <div className="cart-info">

                      <h3>
                        {item.name}
                      </h3>


                      <p>
  Price: ${Number(
    String(item.price).replace(/[$,\s]/g, "")
  ).toLocaleString()}
</p>

<p>
  Subtotal: ${(
    Number(String(item.price).replace(/[$,\s]/g, "")) *
    item.quantity
  ).toLocaleString()}
</p>


                      <div className="quantity-box">

                        <button
                          className="quantity-btn"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          -
                        </button>


                        <span>
                          {item.quantity}
                        </span>


                        <button
                          className="quantity-btn"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>

                      </div>


                    </div>


                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>


                  </div>

                ))
              }

            </div>



            <div className="cart-summary">

              <h2>
                Total:
                <span>
                  ${totalPrice.toLocaleString()}
                </span>
              </h2>


             <Link to="/checkout">

  <button className="checkout-btn">
    Proceed To Checkout
  </button>

</Link>


            </div>


          </>

        )
      }


    </div>

  );

};


export default Cart