

import React, { useContext } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = ({ cartItems, removeFromCart, increaseQuantity, decreaseQuantity, totalAmount }) => {
  const { toggleCart } = useContext(CartContext);
  const navigate = useNavigate();


  const handleProceedToCheckout = () => {
    // toggleCart(); 
   navigate('/checkout');
   
   
  };

  return (
    <div className="cart">
      <button className="close-cart" onClick={() => toggleCart()}>Close</button>
      <h2>Shopping Cart</h2>
      <ul className="cart-item-box">
        {cartItems.map(item => (
            
          <li key={`${item.id}-${item.size}`} className="cart-item">
            <div className="cart-item-details">
              <div className="cart-item-image">
                
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <p>{item.name} ({item.size})</p>
                <div className="cart-item-controls">
                  <div className="quantity">
                    <button onClick={() => decreaseQuantity(item.id, item.size)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id, item.size)}>+</button>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id, item.size)}>Remove</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <p>Total: ${totalAmount.toFixed(2)}</p>
      </div>
      <button
        className="proceed-to-checkout"
        onClick={handleProceedToCheckout}
        disabled={cartItems.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;
