import React, { useEffect, useState } from 'react';
import ProductTable from './ProductTable';
import { fetchCategories, fetchProductsByCategory } from '../../../utils/services/api';
import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';
import './ProductManagement.css';

const ProductManagement = () => {
  const [selectedCategory, setCategory] = useState('electronics');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('default');

  // Fetch categories and set them when the component mounts
  useEffect(() => {
    fetchCategories()
    .then((response) => {
      setCategories(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  // Sort the categories by fullPath alphabetically before rendering options
  const sortedCategories = [...categories].sort((a, b) => {
    if (a.fullPath && b.fullPath) {
      return a.fullPath.localeCompare(b.fullPath);
    } else if (a.fullPath) {
      return -1;
    } else if (b.fullPath) {
      return 1;
    } else {
      // If neither category has fullPath, sort by name
      return a.name.localeCompare(b.name);
    }
  });

  // Fetch products when the selected category changes
  useEffect(() => {
    fetchProductsByCategory(selectedCategory)
    .then((response) => {
      setProducts(response.products);
    })
    .catch((error) => {
      console.log(error);
      setProducts('');
    });
  }, [selectedCategory]);

  // Sort products when the sort option changes
  useEffect(() => {
    const sortedProducts = [...products];
    if (sort === 'priceAsc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'priceDesc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'mostSold') {
      sortedProducts.sort((a, b) => b.sold - a.sold);
    } else if (sort === 'alphabeticalAsc') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'alphabeticalDesc') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    setProducts(sortedProducts)
  }, [sort]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSort('default');
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className="product-management-container">
      <select className="product-management-selector" name="categories" value={selectedCategory} onChange={handleCategoryChange}>
        {sortedCategories.map((category) => (
          <option key={category._id} value={category.name}>
            {category.fullPath ? capitalizeFirstLetter(category.fullPath) + category.name: capitalizeFirstLetter(category.name)}
          </option>
        ))}
      </select>
      <select className="product-management-selector" value={sort} onChange={handleSortChange}>
        <option value="default">Sort</option>
        <option value="priceAsc">Least expensive</option>
        <option value="priceDesc">Most expensive</option>
        <option value="mostSold">Most sold</option>
        <option value="alphabeticalAsc">Alphabetical (A-Z)</option>
        <option value="alphabeticalDesc">Alphabetical (Z-A)</option>
      </select>
      <span>{products.length} Products</span>

      {products ? 
        <ProductTable products={products}/>
        :
        <p>No products in this category</p>
      }
      
    </div>
  );
};

export default ProductManagement;