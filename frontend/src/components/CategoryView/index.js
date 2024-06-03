import React, { useState, useEffect } from 'react';
import ProductCard from '../common/ProductCard';
import { fetchProductsByPage } from '../../utils/services/api';
import './CategoryView.css';

const CategoryView = ({ category }) => {
  const [currentCategory, setCurrentCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); 
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState('default');

  const sortOptions = {
    default: 'Sort',
    priceAsc: 'Least expensive',
    priceDesc: 'Most expensive',
    mostSold: 'Most sold',
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchProductsByPage(category, currentPage, productsPerPage, sort)
    .then((data) => {
      setProducts(data.products);
      setTotalProducts(data.totalProducts);
      setTotalPages(data.totalPages);

      if (currentCategory !== category) {
        setCurrentPage(1);
      } 

      setCurrentCategory(category)
      setError('');
    })
    .catch((error) => {
      if (error.message === 'Failed to fetch') {
        setError('Network error. Try refreshing the page. If the issue persists, please try again later.')
      } else {
        setError(error.message);
      }

      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [category, currentPage, productsPerPage, sort]);

  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  };

  if (error) {
    return (
      <p>{error}</p>
    );
  };

  return (
    <div className="category">
      <div className="category-header">
        <p className="category-product-amount">{totalProducts} Products</p>
        <p className="category-current-page">Page {currentPage} / {totalPages}</p>
        <select className="category-sort" value={sort} onChange={handleSortChange}>
          {Object.entries(sortOptions).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="category-container">
        {error ? (
          <p>Error: {error}</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
      
      <div className="category-pagination">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} / {totalPages}</span>
        <button
          className="pagination-button"
          disabled={totalProducts <= productsPerPage * currentPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default CategoryView;