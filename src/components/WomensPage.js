import React, { useState, useContext, useEffect } from 'react';
import SideNav from '../components/SideNav';
import Cart from '../components/Cart';
import { CartContext } from '../context/CartContext';
import { fetchProducts } from '../api/products';
import './WomensPage.css';

function WomensPage() {
  const { cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, totalAmount, isCartVisible, toggleCart } = useContext(CartContext);

  const [category, setCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading indicator

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
        setLoading(false); // Once products are fetched, set loading to false
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error state or retry logic if needed
      }
    };
    getProducts();
  }, []);

  const handleSizeChange = (productId, size) => {
    setSelectedSize({
      ...selectedSize,
      [productId]: size
    });
  };

  const handleAddToCart = (product) => {
    let size = null;
    if (product.category === 'clothes' || product.category === 'shoes') {
      size = selectedSize[product.id] || (product.category === 'clothes' ? 'M' : '8'); // Default size is 'M' for clothes and '8' for shoes
    }
    addToCart({ ...product, size });
    setSelectedSize({
      ...selectedSize,
      [product.id]: null
    });
  };

  const renderProductList = () => {
    if (loading) {
      return <p>Loading...</p>; // Display loading state until products are fetched
    }

    return filteredProducts.map(product => (
      <div
        key={product.id}
        className="product-item"
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
      >
        <div className="image-container">
          <img src={product.image} alt={product.name} />
        </div>
        <p>{product.name}</p>
        <p>${product.price}</p>
        {typeof product.price === 'number' && (
          <p>${product.price.toFixed(2)}</p>
        )}
        {(product.category === 'clothes' || product.category === 'shoes') && (
            <div className="sizes-container">
                {Array.isArray(product.sizes)
                ? product.sizes.map(size => (
                    <div
                        key={size}
                        className={`size-box ${selectedSize[product.id] === size ? 'selected' : ''}`}
                        onClick={() => handleSizeChange(product.id, size)}
                    >
                        {size}
                    </div>
                    ))
                : product.sizes.split(',').map(size => (
                    <div
                        key={size.trim()} // Use size.trim() to remove any extra spaces
                        className={`size-box ${selectedSize[product.id] === size.trim() ? 'selected' : ''}`}
                        onClick={() => handleSizeChange(product.id, size.trim())}
                    >
                        {size.trim()}
                    </div>
                    ))
                }
            </div>
            )}
             {(product.category === 'accessories' || product.category === 'bags') && (
      
            <p>Fixed Size
            </p>
       
        )}
      
        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        {hoveredProduct === product.id && (
          <div className="enlarged-view">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>${product.price}</p>
            {typeof product.price === 'number' && (
              <p>${product.price.toFixed(2)}</p>
            )}

        {(product.category === 'clothes' || product.category === 'shoes') && (
        <div className="sizes-container">
            {Array.isArray(product.sizes)
            ? product.sizes.map(size => (
                <div
                    key={size}
                    className={`size-box ${selectedSize[product.id] === size ? 'selected' : ''}`}
                    onClick={() => handleSizeChange(product.id, size)}
                >
                    {size}
                </div>
                ))
            : product.sizes.split(',').map(size => (
                <div
                    key={size.trim()} // Use size.trim() to remove any extra spaces
                    className={`size-box ${selectedSize[product.id] === size.trim() ? 'selected' : ''}`}
                    onClick={() => handleSizeChange(product.id, size.trim())}
                >
                    {size.trim()}
                </div>
                ))
            }
        </div>
        )}

         {(product.category === 'accessories' || product.category === 'bags') && (
             <div className="sizes-container">
            <p>Fixed Size</p>
            </div>
        )}

            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        )}
      </div>
    ));
  };

  const filteredProducts = category === 'all'
    ? products
    : products.filter(product => product.category === category);

  return (
    <div className="page">
      <SideNav setCategory={setCategory} />
      <div className="content">
        <h1>Womens Products</h1>
        <div className="product-list">
          {renderProductList()}
        </div>
        <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </div>
      {isCartVisible && (
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          totalAmount={totalAmount}
          toggleCart={toggleCart}
        />
      )}
     
    </div>
  );
}

export default WomensPage;
