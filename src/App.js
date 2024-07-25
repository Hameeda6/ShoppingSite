
// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import LoginPage from './components/LoginPage';
import MensPage from './components/MensPage';
import WomensPage from './components/WomensPage';
import { CartProvider } from './context/CartContext';
import CheckoutPage from './components/CheckoutPage';
import SignupPage from './components/SignupPage';
import UserHomepage from './components/UserHomepage';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log("is auth1",isAuthenticated)

  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Perform logout logic (clear local storage, etc.)
  };

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
            cartCount={cartCount}
          />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/mens" element={<MensPage />} />
            <Route path="/womens" element={<WomensPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/user/:userId" element={<UserHomepage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
