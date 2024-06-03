import React, { useEffect, useState } from 'react';
import './ProductCard.css';
import { useAuth } from '../../../utils/AuthContext';
import Modal from '../Modal/Index';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../../../utils/services/api';
import { useCartContext } from '../../../utils/CartContext';
import { defaultImageUrl, s3ImageUrl } from '../../../config';

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCartContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [imageExists, setImageExists] = useState(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleActionModal = () => {
    deleteProduct(product._id)
    .then(() => {
      setIsDeleted(true);
      setIsModalOpen(false);
    })
    .catch((error) => {
      console.error('Error deleting product:', error);
    })
  };

  useEffect(() => {
    // Check if the image exists in S3
    const checkImageExists = async () => {
      try {
        const response = await fetch(`${s3ImageUrl}/${product.imageName}`);
        if (!response.ok) {
          // Image does not exist in S3, set imageExists to false
          setImageExists(false);
        }
      } catch (error) {
        console.error('Error checking image existence:', error);
        // In case of an error, assume image does not exist
        setImageExists(false);
      }
    };

    if (product.imageName) {
      checkImageExists();
    } else {
      // No image name provided, set imageExists to false
      setImageExists(false);
    }
  }, [product.imageName]);

  // Define a CSS class for the delete button based on the isDeleted state
  const deleteButtonClass = isDeleted
    ? 'product-card-delete-btn product-card-delete-btn-is-deleted'
    : 'product-card-delete-btn';

  return (
    <div className='product-card'>
      {user?.accessLevel === 'admin' && (
        isDeleted ? (
          <button className={deleteButtonClass}>Deleted</button>
        ) : (
          <button className={deleteButtonClass} onClick={handleOpenModal}>Delete</button>
        )
      )}
      
      <Modal 
        isOpen={isModalOpen}
        action='Delete'
        onAction={handleActionModal} 
        onClose={handleCloseModal} 
        title='Delete product'
        message='Are you sure?'
      />
      
      <div className="product-card-content">
        <Link to={`/product/${product._id}/${product.name.replace(" ", "-")}`}>
        {imageExists ? (
          <img
            src={`${s3ImageUrl}/${product.imageName}`}
            alt={product.name}
            className="product-card-image"
          />
        ) : (
          <img
            src={defaultImageUrl}
            alt={product.name}
            className="product-card-image"
          />
        )}
        <h3 className="product-card-name">{product.name}</h3>
        {product.discountAmount ?
        <div className="product-card-price-container">
          <p className="product-card-price original-price">${product.price}</p>
          <p className="product-card-price">${product.price - product.price * (product.discountAmount / 100)}</p>
        </div>:
          <p className="product-card-price">${product.price}</p>
        }
        
        </Link>
        <button className="product-card-add-to-cart-btn" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard;