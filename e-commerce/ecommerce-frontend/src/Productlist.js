// ProductList.js
import React from 'react';
import { Link } from 'react-router-dom';

function ProductList({ products }) {
  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <Link to="/cart">Add to Cart</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
