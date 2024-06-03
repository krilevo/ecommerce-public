import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import { fetchBestSellingProducts } from '../../../utils/services/api';
import { fetchDiscountedProducts } from '../../../utils/services/api';
import './ProductSlider.css';

const ProductSlider = ({ criteria }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (criteria === 'best-selling') {
          data = await fetchBestSellingProducts();
        } else if (criteria === 'discounted') {
          data = await fetchDiscountedProducts();
        }
        setProducts(data);
      } catch (error) {
        setError('An error occurred while fetching products.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="product-slider-list">
        Loading...
      </div>
    );
  }

  if (error) {
    return  (
      <div className="product-slider-list">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="product-slider-list">
      {products.map((product) => (
        <ProductCard key={product._id} product={product}/>
      ))}
    </div>
  );
};

export default ProductSlider;
