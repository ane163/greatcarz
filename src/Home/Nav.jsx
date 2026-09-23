import React, { useState, useEffect } from "react";
import './Nav.css'
import { BiCartAdd, BiUser, BiSearch} from 'react-icons/bi'
import { useContext } from "react";
import { CartContext } from "../Categories/CartContext";
import {Link, useNavigate} from "react-router-dom";



const Nav = ({ search, setSearch }) => {

const [scrolled, setScrolled] = useState(false);
const {cart}=useContext(CartContext);
const navigate = useNavigate();

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);


  return (
    <div>
      <nav className={scrolled ? "navbar scrolled" : "navbar"}>
   
    <div className='nav-logo'>
        <h2>GREATCARS</h2>
        
        </div>
       <div className="search-box">
  <input
    type="text"
    placeholder="Search cars..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        navigate("/products");
      }
    }}
  />

  <BiSearch
    className="search-icon"
    onClick={() => navigate("/products")}
  />
</div>
         <div className='link'>
            <ul>
               <li><Link to="/">Home</Link></li>
<li><Link to="/products">Shop</Link></li>
<li><Link to="/about">About</Link></li>
<li><Link to="/contact">Contact</Link></li>
            </ul>
            </div>
            <div className='nav-icon'>

            <div className="cart-icon">
<Link to="/cart">
   <BiCartAdd className='icon cart'/>
   <span>{cart.length}</span>

</Link>



</div>
              
               <Link to="/user">
  <BiUser className="icon" />
</Link> 
                </div>
                </nav>
    </div>
  )
}

export default Nav;
