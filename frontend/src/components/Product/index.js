import React from 'react';
import BreadCrumb from './BreadCrumb';
import { s3ImageUrl } from '../../config';
import { defaultImageUrl } from '../../config';
import { useCartContext } from '../../utils/CartContext';
import './Product.css';

const Product = ({ product }) => {
  const { addToCart } = useCartContext();
  
  return (
    <div className="product-container">
      <div className="product">
      <BreadCrumb categoryPath={product.categoryPath} />
        <div className="product-box">
          <div className="product-info-main">
            <h1 className="product-name">{product.name}</h1>
            <img 
              src={product.imageName ? `${s3ImageUrl}/${product.imageName}` : defaultImageUrl}
              alt={product.name} 
              className="product-image" 
            />
          </div>
          <div className="product-info-sidebar">
            {
              product.discountAmount ? 
              <>
                <p className="product-price original-price">${product.price}</p>
                <p className="product-price">${product.price - product.price * (product.discountAmount / 100)}</p>
                <p>Discount: {product.discountAmount}%</p>
              </> : 
              <p className="product-price">${product.price}</p>
            }
            
            <p className="product-stock">In stock: {product.stock}</p>
            
            <button className="product-add-to-cart-btn" onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        </div>
        <div className="product-description">{product.description}</div>
      </div>
    </div>
  );
}

export default Product;
