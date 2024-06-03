import React, { useEffect, useState } from 'react';
import { updateProduct } from '../../utils/services/api';
import './EditProduct.css';

const EditProduct = ({ product, setProduct, isVisible, setIsVisible }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    stock: product.stock,
    discountAmount: product.discountAmount
  });

  const [errors, setErrors] = useState({
    name: '',
    price: '',
    discountAmount: '',
    description: '',
    stock: '',
  });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.edit-product-form')) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isVisible]);

  useEffect(() => {
    // Add or remove the 'no-scroll' class to the body element based on 'isVisible'
    if (isVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isVisible]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      price: '',
      discountAmount: '',
      description: '',
      stock: ''
    };

    if (formData.name.trim() === '') {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Price must be a positive number';
      valid = false;
    }

    if (isNaN(formData.discountAmount) || formData.discountAmount <= 0) {
      newErrors.discountAmount = 'Discount must be a positive value';
      valid = false;
    }

    if (formData.description.trim() === '') {
      newErrors.description = 'Description is required';
      valid = false;
    }

    if (isNaN(formData.stock) || formData.stock < 0) {
      newErrors.stock = 'Stock must be a non-negative number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    console.log('updating');

    if (!validateForm()) {
      setIsUpdating(false);
      return; // Do not submit if validation fails
    }

    const updatedProduct = {
      id: product._id, 
      ...formData
    };

    updateProduct(updatedProduct.id, updatedProduct)
    .then((response) => {
      setProduct(response.updatedProduct)
      setIsVisible(false)
    })
    .catch((error) => {
      console.log(error)
    }) 
    .finally(setIsUpdating(false));
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <>
    {isVisible ?<div className="edit-product-bg"></div> : ''}
      <form className={`edit-product-form ${isVisible ? 'edit-product-form-visible' : ''}`} onSubmit={handleSubmit}>
        <div className="edit-product-form-group">
          <label className="edit-product-form-label" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <div className="error">{errors.name}</div>
        </div>

        <div className="edit-product-form-group">
          <label className="edit-product-form-label" htmlFor="price">Price ($):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange} 
          />
          <div className="error">{errors.price}</div>
        </div>

        <div className="edit-product-form-group">
          <label className="edit-product-form-label" htmlFor="discount">Discount (%):</label>
          <input
            type="number"
            id="discount"
            name="discountAmount"
            value={formData.discountAmount}
            onChange={handleChange} 
          />
          <div className="error">{errors.discountAmount}</div>
        </div>

        <div className="edit-product-form-group">
          <label className="edit-product-form-label" htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows={8}
            value={formData.description}
            onChange={handleChange}
          />
          <div className="error">{errors.description}</div>
        </div>

        <div className="edit-product-form-group">
          <label className="edit-product-form-label" htmlFor="stock">In Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
          <div className="error">{errors.stock}</div>
        </div>

        <div className="edit-product-form-actions">
        <button type="submit" disabled={isUpdating} className="btn btn-primary">
            {isUpdating ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={() => setIsVisible(false)} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProduct;