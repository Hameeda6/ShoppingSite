import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserHomepage = () => {
  const { userId } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/cart-items/${userId}/`, { withCredentials: true });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Failed to fetch cart items.');
      }
    };

    fetchCartItems();
  }, [userId]);

  return (
    <div>
      <h2>Welcome, User {userId}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>{item.product.name} - {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserHomepage;
