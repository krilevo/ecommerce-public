import React from 'react';
import { s3ImageUrl } from '../../../config';
import { Link } from 'react-router-dom';

const CartItem = ({ product, onIncrease, onDecrease}) => {
  return (
    <li className="cart-item">
      <img src={`${s3ImageUrl}/${product.imageName}`} alt={product.name} className="cart-product-image" />
      <div className="cart-product-info">
        <div className="cart-product-details">
          <Link to={`/product/${product._id}/${product.name}`} className="cart-product-name">{product.name}</Link>
        </div>
        <div className="cart-product-quantity-controls">
          <button className="cart-product-quantity-button" onClick={() => onDecrease(product._id)}>{product.quantity === 1 ? 'X' : '-'}</button>
          <p className="cart-product-quantity-value">Quantity: {product.quantity}</p>
          <button className="cart-product-quantity-button" onClick={() => onIncrease(product._id)}>+</button>
        </div>
        {
          product.discountAmount ?
          <div className='cart-product-price-container'>
            <p className="cart-product-price original-price">${product.price}</p>
            <p className="cart-product-price">${product.price - product.price * (product.discountAmount / 100)}</p>
          </div> 
          :
          <div className='cart-product-price-container'>
            <p className="cart-product-price">${product.price}</p>
          </div>
        }
        
      </div>
    </li>
  )
};

export default CartItem;