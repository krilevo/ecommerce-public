import React from 'react';
import Product from './Product';

function RecommendedProducts({ products }) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <div className="product-list">
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default RecommendedProducts;
