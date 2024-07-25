

import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import Cart from '../components/Cart';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, totalAmount, resetCartVisibility } = useContext(CartContext);
  const { toggleCart } = useContext(CartContext);

 
  useEffect(() => {
    resetCartVisibility();
  }, [resetCartVisibility]);

  const handleProceedToPay = () => {
    // Add the payment logic here
    alert('Proceeding to payment...');
  };
//   console.log("checkout",cartItems,totalAmount)

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {/* <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        totalAmount={totalAmount}
      /> */}
      <div>
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
      </div>

      <button
        className="proceed-to-pay"
        onClick={handleProceedToPay}
        disabled={cartItems.length === 0}
      >
        Proceed to Pay
      </button>
    </div>
  );
};

export default CheckoutPage;
