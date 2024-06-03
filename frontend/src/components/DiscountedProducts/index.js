import React, { useEffect, useState } from 'react';
import ProductCard from '../common/ProductCard';
import { fetchDiscountedProducts } from '../../utils/services/api';
import './DiscountedProducts.css';

const DiscountedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDiscountedProducts()
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      console.log(error);
      setError('An error occurred while fetching products.');
    })
    .finally(() => {
      setLoading(false);
    })
  }, []);

  if (loading) {
    return (
      <div className="discounted-products">
        <h2>Discounted Products</h2>
        <div className="discounted-product-list">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="discounted-products">
        <h2>Discounted Products</h2>
        <div className="discounted-product-list">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="discounted-products">
      <h2>Discounted Products</h2>
      <div className="discounted-product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </div>
    </div>
  );
};

export default DiscountedProducts;
