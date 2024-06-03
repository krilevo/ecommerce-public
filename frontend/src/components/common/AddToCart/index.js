import React, { useState } from 'react';
import './AddToCart.css';
import { useCartContext } from '../../../utils/CartContext';

const AddToCart = ({ product }) => {
  const { totalQuantity, setTotalQuantity } = useCartContext();
  const [isAdding, setIsAdding] = useState(false);

  function addToLocalStorage () {
    try {
      setIsAdding(true);
      // Get existing cart from localStorage
      const existingCart = localStorage.getItem('cart');

      // Parse the cart or initialize an empty array
      let cartData = existingCart ? JSON.parse(existingCart) : { items: [] };

      const existingProduct = cartData.items.find(item => item._id === product._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cartData.items.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cartData));

      console.log('Added to local storage', product);

      setTotalQuantity(totalQuantity + 1);
    } catch (error) {
      console.error('Error while adding product to local storage:', 
      error.message);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <button 
      className='add-to-cart-btn' 
      onClick={addToLocalStorage}
      disabled={isAdding}
    >
      {isAdding ? 'Adding...' : 'Add to cart'}
    </button>
  );
};

export default AddToCart;