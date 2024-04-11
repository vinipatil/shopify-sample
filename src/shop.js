import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        setProducts(response.data.categories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const displayProducts = () => {
    let filteredProducts = [];
    for (const cat of products) {
      if (selectedCategory === '' || cat.category_name === selectedCategory) {
        for (const product of cat.category_products) {
          if (
            product.title.toLowerCase().includes(searchText.toLowerCase()) ||
            product.vendor.toLowerCase().includes(searchText.toLowerCase())
          ) {
            filteredProducts.push(product);
          }
        }
      }
    }
    return filteredProducts;
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    setCartItems(prevItems => [...prevItems, product]);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  };

  const handleBuy = () => {
  };

  return (
    <div className="container">
      <div className='cont'>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="category-buttons">
          {products.map(cat => (
            <button key={cat.category_name} onClick={() => handleCategoryChange(cat.category_name)}>{cat.category_name}</button>
          ))}
        </div>
        <div className="products">
          {displayProducts().map(product => (
            <div key={product.title} className="product">
              <div className="card">
                <img src={product.image} alt={product.title} />
                <br />
                <h3>{product.title}</h3>
                <p>Price: Rs. {product.price} | {product.compare_at_price}</p>
                <p>Vendor: {product.vendor}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='crt'>
        {cartItems.length > 0 && (
          <div className="cart">
            <h2>My Cart</h2>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.title} className="cart-item">
                  <div className="card">
                    <img src={item.image} alt={item.title} />
                    <h3>{item.title}</h3>
                    <p>Price: Rs. {item.price}</p>
                    <p>Vendor: {item.vendor}</p>
                  </div>
                </div>
              ))}
            </div><br></br>
            <div className="total-amount">Total: Rs. {calculateTotalAmount().toFixed(2)}</div><br></br>
            <button className='buy' onClick={handleBuy}>Buy</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
