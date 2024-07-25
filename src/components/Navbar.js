import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

function Navbar({ isAuthenticated, handleLogout, cartCount }) {
  const navigate = useNavigate();
  const { cartItems, toggleCart } = useContext(CartContext);
  console.log("is auth",isAuthenticated)

  const goToMens = () => {
    navigate('/mens');
  };

  const goToWomens = () => {
    navigate('/womens');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ color: 'white' }}>E-Commerce</Link>
      </div>
      <div className="navbar-buttons">
        <button className="navbar-button" 
        // onClick={goToMens}
        >
          Men's
        </button>
        <button className="navbar-button" onClick={goToWomens}>
          Women's
        </button>
        <button className="navbar-button" onClick={toggleCart}>
          Cart ({cartItems.length})
        </button>
        {isAuthenticated ? (
          <button className="navbar-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <button className="navbar-button" onClick={goToLogin}>
              Login
            </button>
            <button className="navbar-button" onClick={goToSignup}>
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
