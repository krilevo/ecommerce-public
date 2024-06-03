import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePopup } from './PopupContext';

const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState({ items: [] });
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const { openPopup } = usePopup();

  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem('cart'));
    setCartData(storedCartData || { items: [] });
  }, []);

  useEffect(() => {
    calculateTotalPriceAndQuantity();
  }, [cartData]);

  const calculateTotalPriceAndQuantity = () => {
    let calculatedTotalPrice = 0;
    let calculatedTotalQuantity = 0;

    cartData.items.forEach((product) => {
      calculatedTotalPrice += product.price * product.quantity;
      calculatedTotalQuantity += product.quantity;
    });

    setTotalPrice(calculatedTotalPrice);
    setTotalQuantity(calculatedTotalQuantity);
  };

  const addToCart = (product) => {
    try {
      // Get existing cart from localStorage
      const existingCart = localStorage.getItem('cart');

      // Parse the cart or initialize an empty array
      let cartData = existingCart ? JSON.parse(existingCart) : { items: [] };

      const existingProduct = cartData.items.find((item) => item._id === product._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cartData.items.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cartData));
      openPopup('Added', product.name + ' added to cart');

      setTotalQuantity(totalQuantity + 1);
    } catch (error) {
      console.error('Error while adding product to local storage:', error.message);
    }
  };

  return (
    <CartContext.Provider 
    // value={{ cartQuantity, setCartQuantity }}
    value={{ cartData, setCartData, totalPrice, setTotalPrice, totalQuantity, setTotalQuantity, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
