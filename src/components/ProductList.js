import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/products';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const products = await fetchProducts();
            setProducts(products);
        };
        getProducts();
    }, []);

    return (
        <div>
            {products.map(product => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <img src={`http://44.211.249.149:8001/media/products/${product.image}`} alt={product.name} />
                    {/* <img src={`http://127.0.0.1:8001${product.image}`} alt={product.name} /> */}
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
