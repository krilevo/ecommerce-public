import React, { useState, useEffect } from 'react';
import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';
import { deleteCategory, fetchCategories } from '../../../utils/services/api';
import { usePopup } from '../../../utils/PopupContext';
import './DeleteCategory.css';

const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { openPopup } = usePopup();

  useEffect(() => {
    getcategories();
  }, []);

  const getcategories = () => {
    fetchCategories()
    .then((data) => {
      const sortedCategories = [...data].sort((a, b) => {
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
      setCategories(sortedCategories);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    deleteCategory(selectedCategory)
    .then(() => {
      getcategories();
      openPopup('Deleted', 'Category deleted succesfully');
    })
    .catch((error) => {
      console.log(error);
      openPopup('Error', error.message);
    })
  };

  return (
    <div className="delete-category-container">
      <form className="delete-category-form" onSubmit={handleSubmit}>
        <select className='input' value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select a category to delete</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.fullPath ? capitalizeFirstLetter(category.fullPath) + category.name : capitalizeFirstLetter(category.name)}
            </option>
          ))}
        </select>
        <button type="submit">Delete category</button>
      </form>
    </div>
  );
};

export default DeleteCategory;
