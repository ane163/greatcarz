import React, { useContext, useState } from "react";
import { CartContext } from "../Categories/CartContext";
import "./Checkout.css";
import { Link } from "react-router-dom"


const Checkout = () => {

const [paymentMethod, setPaymentMethod] = useState("EcoCash");
const [customer, setCustomer] = useState({
  customerName: "",
  phone: "",
  email: "",
  address: "",
});
  const { cart } = useContext(CartContext);


 const totalPrice = cart.reduce((total, item) => {
  const price = Number(
    String(item.price).replace(/[$,\s]/g, "")
  );

  return total + price * item.quantity;
}, 0);


const handleChange = (e) => {
  setCustomer({
    ...customer,
    [e.target.name]: e.target.value,
  });
};
const placeOrder = async () => {

  const orderData = {
    ...customer,
    products: cart,
    totalPrice,
    paymentMethod,
  };


  try {

    const response = await fetch(
      "http://localhost:5000/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );


    const data = await response.json();


    if(response.ok){

      alert("Order placed successfully!");

    }else{

      alert(data.message);

    }


  } catch(err){

    console.log(err);
    alert("Server error");

  }

}

  return (

    <div className="checkout-container">


      <h1 className="checkout-title">
        Complete Your Order
      </h1>



      <div className="checkout-box">



        {/* Customer Details */}

        <div className="customer-details">

          <h2>
            Customer Details
          </h2>


         <input
type="text"
name="customerName"
placeholder="Full Name"
value={customer.customerName}
onChange={handleChange}
/>


          <input
type="text"
name="phone"
placeholder="Phone Number"
value={customer.phone}
onChange={handleChange}
/>


          <input
type="email"
name="email"
placeholder="Email Address"
value={customer.email}
onChange={handleChange}
/>


         
<textarea
name="address"
placeholder="Delivery Address"
value={customer.address}
onChange={handleChange}
></textarea>

        </div>


<div className="payment-method">

  <h2>Payment Method</h2>

  <label>
    <input
      type="radio"
      value="EcoCash"
      checked={paymentMethod === "EcoCash"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    EcoCash
  </label>

  <label>
    <input
      type="radio"
      value="Visa / Mastercard"
      checked={paymentMethod === "Visa / Mastercard"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    Visa / Mastercard
  </label>

  <label>
    <input
      type="radio"
      value="Bank Transfer"
      checked={paymentMethod === "Bank Transfer"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    Bank Transfer
  </label>

  <label>
    <input
      type="radio"
      value="Cash on Collection"
      checked={paymentMethod === "Cash on Collection"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    Cash on Collection
  </label>

</div>

{/* Payment Method */}

<div className="payment-method">

  <h2>
    Payment Method
  </h2>

  <label>
    <input
      type="radio"
      value="EcoCash"
      checked={paymentMethod === "EcoCash"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    📱 EcoCash
  </label>


  <label>
    <input
      type="radio"
      value="Visa / Mastercard"
      checked={paymentMethod === "Visa / Mastercard"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    💳 Visa / Mastercard
  </label>


  <label>
    <input
      type="radio"
      value="Bank Transfer"
      checked={paymentMethod === "Bank Transfer"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    🏦 Bank Transfer
  </label>


  <label>
    <input
      type="radio"
      value="Cash on Collection"
      checked={paymentMethod === "Cash on Collection"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    💵 Cash on Collection
  </label>


</div>
        {/* Order Summary */}

        <div className="order-summary">


          <h2>
            Order Summary
          </h2>



          {
            cart.map(item => (

              <div 
              className="checkout-item"
              key={item.id}
              >

               <img
  src={item.image}
  alt={item.name}
/>

                <div>

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Qty: {item.quantity}
                  </p>

                  <p>
  Subtotal: ${(
    Number(String(item.price).replace(/[$,\s]/g, "")) *
    item.quantity
  ).toLocaleString()}
</p>

                </div>


              </div>


            ))
          }



          <div className="checkout-total">

            Total:
            <span>
              ${totalPrice.toLocaleString()}
            </span>


          </div>



          <button
className="place-order-btn"
onClick={placeOrder}
>
Place Order
</button>


        </div>



      </div>


    </div>

  );

};


export default Checkout