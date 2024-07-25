// src/components/MensPage.js

import React, { useState } from 'react';
import SideNav from './SideNav';
import { products } from '../data/products'; // Make sure to add mens products to this array.
import './MensPage.css';

function MensPage() {
  const [category, setCategory] = useState('all');

  const filteredProducts = category === 'all'
    ? products
    : products.filter(product => product.category === category);

  return (
    <div className="page">
      <SideNav setCategory={setCategory} />
      <div className="content">
        <h1>Mens Products</h1>
        <div className="product-list">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-item">
              {product.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MensPage;
