import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import { fetchSubCategories } from '../../utils/services/api';

const SubCategoryBar = ({ categories, categoryName, onClose, closeNav }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const handleCloseClick = () => {
    onClose();
  };

  const closeSubCategoryBar = () => {
    setSubCategories([]);
  };

  const handleClick = async (subCategoryName) => {
    setSelectedSubCategory(subCategoryName);
    fetchSubCategories(subCategoryName)
    .then((data) => {
      setSubCategories(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    // Reset subCategories and selectedSubCategory when a new root parent category is clicked
    setSubCategories([]);
    setSelectedSubCategory('');
  }, [categoryName]);

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <>
      <ul className="category-bar sub-category-bar">
        <h3 className="category-bar-name"><button className="previous-category-btn" onClick={handleCloseClick}>&lt;</button>{capitalizeFirstLetter(categoryName)}</h3>
        {categories.map((category) => (
          <li 
            key={category._id} 
            className={`category-bar-item ${selectedSubCategory === category.name ? 'selected' : ''}`}>
            <Link 
              to={`/category/${category.name}`} 
              onClick={closeNav}
              className="category-bar-item-link">{capitalizeFirstLetter(category.name)}
            </Link>
            {category.hasSubcategories && (
              <button className="arrow-btn" onClick={() => handleClick(category.name)}>&gt;</button>
            )}
          </li>
        ))}
      </ul>
      {subCategories && subCategories.length > 0 && (
        <SubCategoryBar categories={subCategories} categoryName={selectedSubCategory} onClose={closeSubCategoryBar} closeNav={closeNav}/>
      )}
    </>
  );
};

export default SubCategoryBar;
