import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id && item.size === product.size);
    
    if (existingItem) {
      const updatedCartItems = cartItems.map(item =>
        item.id === product.id && item.size === product.size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    setIsCartVisible(true);
  };

  const removeFromCart = (productId, size) => {
    setCartItems(cartItems.filter(item => !(item.id === productId && item.size === size)));
  };

  const increaseQuantity = (productId, size) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId && item.size === size
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (productId, size) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId && item.size === size && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems.filter(item => item.quantity > 0));
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const resetCartVisibility = () => {
    setIsCartVisible(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalAmount: calculateTotalAmount(),
        isCartVisible,
        toggleCart,
        resetCartVisibility,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

