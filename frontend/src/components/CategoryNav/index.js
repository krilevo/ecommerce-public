import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SubCategoryBar from './SubCategoryBar';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import { fetchTopCategories } from '../../utils/services/api';
import { BASE_URL } from '../../config';
import './CategoryNav.css';

const CategoryNav = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Close the category nav on outside click
  useEffect(() => {
    const handleOutsideClick = ({ target }) => {
      if (!target.closest('.category-nav')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  useEffect(() => {
    fetchTopCategories()
    .then((data) => {
      setCategories(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const closeSubCategoryBar = () => {
    setSubCategories([]);
  };

  const handleCategoryClick = async (categoryName) => {
    setSelectedCategory(categoryName);
    try {
      const response = await fetch(`${BASE_URL}/categories/sub/${categoryName}`);
      const data = await response.json();
      setSubCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="category-nav-background">
      <div className="category-nav">
        <ul className="category-bar">
          <h3 className="category-bar-name">
            <button className="category-nav-close-btn" onClick={onClose}>X</button>
            Categories
          </h3>
          {categories.map((category) => (
            <li 
              key={category._id} 
              className={`category-bar-item ${selectedCategory === category.name ? 'selected' : ''}`}>
              <Link 
                to={`/category/${category.name}`} 
                onClick={onClose}
                className="category-bar-item-link">{capitalizeFirstLetter(category.name)}
              </Link>
              <button className="arrow-btn" onClick={() => handleCategoryClick(category.name)}>&gt;</button>
            </li>
          ))}
        </ul>
        {subCategories && subCategories.length > 0 && (
            <SubCategoryBar categories={subCategories} categoryName={selectedCategory} onClose={closeSubCategoryBar} closeNav={onClose}/>
          )}
      </div>
    </div>
  );
};

export default CategoryNav;