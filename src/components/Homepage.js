// src/components/HomePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div className="background">
        <div className="buttons">
          <button className="category-button">Mens</button>
          <button className="category-button" onClick={() => navigate('/womens')}>Womens</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
