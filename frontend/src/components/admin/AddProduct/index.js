import React, { useEffect, useRef, useState } from 'react';
import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';
import { addProduct, fetchBottomCategories } from '../../../utils/services/api';
import { usePopup } from '../../../utils/PopupContext';
import './AddProduct.css';

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { openPopup } = usePopup();
  const [bottomCategories, setBottomCategories] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    categoryPath: '',
    price: '',
    stock: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({
    name: '',
    categoryPath: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  });

  const imageInputRef = useRef(null);

  useEffect(() => {
    fetchBottomCategories()
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
      setBottomCategories(sortedCategories);
    })
    .catch((error) => {
      console.log(error);
      openPopup('Error', 'Failed to fetch categories')
    })
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setImageFile(image);
  };

  const handleFormReset = () => {
    // Reset the form values
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }

    setProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: ''
    });
    setImageFile(null);
  }

  const handleAddProduct = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData(); // Create a FormData object
    formData.append('image', imageFile); // Append the image file to the form data

    // Append other product details to the form data
    for (const key in product) {
      formData.append(key, product[key]);
    }

    addProduct(formData)
    .then(() => {
      openPopup('Added', 'Product added succesfully')
    })
    .catch((error) => {
      console.log(error);
      openPopup('Error', error.message);
      handleFormReset();
    })
    .finally(() => {
      setIsLoading(false);
    })
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      categoryPath: '',
      price: '',
      stock: '',
      description: '',
      image: ''
    };

    let isValid = true;

    if (!product.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!product.categoryPath) {
      newErrors.categoryPath = 'Category is required';
      isValid = false;
    }

    if (!product.price || product.price <= 0) {
      newErrors.price = 'Price is required and must be a positive number';
      isValid = false;
    }

    if (!product.stock || product.stock < 0) {
      newErrors.stock = 'Stock must be a non-negative number';
      isValid = false;
    }

    if (!product.description) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!imageFile) {
      newErrors.image = 'An image is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="add-product-container">
      <form className="add-product-form">
        <label htmlFor="add-product-name">Name</label>
        <input
          id="add-product-name"
          className='input'
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <span className="add-product-error-message">{errors.name}</span>

        <label htmlFor="add-product-category">Category</label>
        <select
          id="add-product-category"
          className='input'
          value={product.category}
          name="categoryPath"
          onChange={handleChange}>
          <option value="">Select a Category</option>
          {bottomCategories.map((category) => (
            <option key={category._id} value={category.fullPath + category.name}>
              {category.fullPath ? capitalizeFirstLetter(category.fullPath) + category.name : capitalizeFirstLetter(category.name)}
            </option>
          ))}
        </select>
        <span className="add-product-error-message">{errors.categoryPath}</span>

        <label htmlFor="add-product-price">Price</label>
        <input
          id="add-product-price"
          className='input'
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
        <span className="add-product-error-message">{errors.price}</span>

        <label htmlFor="add-product-stock">Stock</label>
        <input
          id="add-product-stock"
          className='input'
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
        />
        <span className="add-product-error-message">{errors.stock}</span>

        <label htmlFor="add-product-description">Description</label>
        <textarea
          id="add-product-description"
          className='input'
          name="description"
          value={product.description}
          onChange={handleChange}
          rows="5"
        />
        <span className="add-product-error-message">{errors.description}</span>

        <label htmlFor="add-product-image">Image</label>
        <input
          id="add-product-image"
          className='input'
          type="file"
          accept="image/*" // Allow only image files
          ref={imageInputRef}
          onChange={handleImageChange}
        />
        <span className="add-product-error-message">{errors.image}</span>

        <div className="add-product-form-btn-container">
          <button 
            className="add-product-form-btn" 
            onClick={handleAddProduct} 
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;