import React from 'react';
import CartItem from './CartItem';
import './Cart.css';

const Cart = ({ cartData, setCartData, totalPrice, totalQuantity, goToNextStep }) => {
  
  const updateCartData = (newCartData) => {
    setCartData(newCartData);
    localStorage.setItem('cart', JSON.stringify(newCartData));
  };

  const increaseQuantity = (productId) => {
    const updatedCartData = {
      ...cartData,
      items: cartData.items.map(product => {
        if (product._id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      })
    };
    updateCartData(updatedCartData);
  };

  const decreaseQuantity = (productId) => {
    const updatedCartData = {
      ...cartData,
      items: cartData.items.map(product => {
        if (product._id === productId) {
          const newQuantity = product.quantity - 1;
          return { ...product, quantity: newQuantity };
        }
        return product;
      }).filter(product => product.quantity > 0) // Remove products with quantity 0
    };
    updateCartData(updatedCartData);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartData && cartData.items.length > 0 ? (
        <ul className="cart-items">
          {cartData.items.map((product, index) => (
            <CartItem
              key={index}
              product={product}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
            />
          ))}
          <li className="cart-total">{totalQuantity} products, total price: ${totalPrice.toFixed(2)}</li>
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className="checkout-page-buttons">
        <button 
          className={cartData.items.length === 0 ? 'checkout-page-button-disabled' : ''} 
          onClick={goToNextStep} 
          disabled={cartData.items.length === 0}
          >
          Next
        </button>
      </div>
    </div>
  );
};

export default Cart;
