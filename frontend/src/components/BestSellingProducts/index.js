import React, { useEffect, useState } from 'react';
import ProductCard from '../common/ProductCard';
import { fetchBestSellingProducts } from '../../utils/services/api';
import './BestSellingProducts.css';

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBestSellingProducts()
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      setError('An error occurred while fetching products.');
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    })
  }, []);

  if (loading) {
    return (
      <div className="best-selling-products">
        <h2>Best Selling Products</h2>
        <div className="best-selling-product-list">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return  (
      <div className="best-selling-products">
        <h2>Best Selling Products</h2>
        <div className="best-selling-product-list">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="best-selling-products">
      <h2>Best Selling Products</h2>
      <div className="best-selling-product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
