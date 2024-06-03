import React, { useState, useEffect } from 'react';
import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';
import { addCategory, fetchCategories } from '../../../utils/services/api';
import { usePopup } from '../../../utils/PopupContext';
import './AddCategory.css';

const AddCategory = () => {
  const { openPopup } = usePopup();
  const [parentCategories, setParentCategories] = useState([]);
  const [selectedParent, setSelectedParent] = useState('');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    getParentCategories();
  }, []);

  const getParentCategories = () => {
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
      setParentCategories(sortedCategories);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleParentChange = (event) => {
    setSelectedParent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let parentName = '';
    let parentFullpath = '';
    let createTopCategory = selectedParent === '';

    if (!createTopCategory) {
      const selectedCategory = parentCategories.find(category => category._id === selectedParent);
      parentName = selectedCategory.name;
      parentFullpath = selectedCategory.fullPath + selectedCategory.name + '/';
    }
    
    addCategory(parentName, parentFullpath, categoryName, createTopCategory)
    .then(() => {
      openPopup('Added', 'Category added succesfully')

      // Reset form fields
      setCategoryName('');
      setSelectedParent('');
      getParentCategories();
    })
    .catch((error) => {
      console.log(error);
      openPopup('Error', error.message);
    });
  };

  return (
    <div className="add-category-container">
      <form className="add-category-form" onSubmit={handleSubmit}>
        <input 
          className='input'
          type="text" 
          value={categoryName} 
          onChange={handleCategoryNameChange} 
          placeholder="Category Name"
        />
        <select className='input' value={selectedParent} onChange={handleParentChange}>
          <option value="">Select Category Path (Leaving this empty will create a top category)</option>
          {parentCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.fullPath ? capitalizeFirstLetter(category.fullPath) + category.name : capitalizeFirstLetter(category.name)}
            </option>
          ))}
        </select>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
