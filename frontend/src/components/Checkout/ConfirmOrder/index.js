import React from 'react';
import { useAuth } from '../../../utils/AuthContext';
import './ConfirmOrder.css';

const ConfirmOrder = ({
  cartData,
  totalPrice,
  totalQuantity,
  personalDetails,
  selectedDelivery,
  selectedPayment,
  goToPreviousStep,
  savePersonalDetails,
  setSavePersonalDetails,
  confirmOrder,
  isConfirmingOrder
}) => {
  const { items } = cartData;
  const {
    firstName,
    lastName,
    email,
    address,
    city,
    postalCode,
    country,
  } = personalDetails;

  const { user } = useAuth();

  return (
    <div className="confirm-order">
      <h2>Confirm Your Order</h2>
      <ul className="confirm-order-product-list">
        {items.map((product) => (
          <li key={product._id} className="confirm-order-product-item">
            {product.name} (${product.price} X {product.quantity})
          </li>
        ))}
        <li className="confirm-order-total-price">
          {totalQuantity} products, total price: ${totalPrice.toFixed(2)}
        </li>
      </ul>

      <div className="confirm-order-personal-details">
        <h3>Personal Details</h3>
        <p><strong>First Name:</strong> {firstName}</p>
        <p><strong>Last Name:</strong> {lastName}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>City:</strong> {city}</p>
        <p><strong>Postal Code</strong> {postalCode}</p>
        <p><strong>Country:</strong> {country}</p>
      </div>

      <div className="confirm-order-delivery-details">
        <h3>Delivery Method</h3>
        <p>{selectedDelivery}</p>
      </div>

      <div className="confirm-order-payment-details">
        <h3>Payment Method</h3>
        <p>{selectedPayment}</p>
      </div>

      {user ? 
      <div className="confirm-order-checkbox">
        <input
          type="checkbox"
          id="savePersonalDetails"
          checked={savePersonalDetails}
          onChange={() => setSavePersonalDetails(!savePersonalDetails)}
          className="styled-checkbox"
        />
        <label htmlFor="savePersonalDetails">Save personal details for faster buying in the future</label>
      </div> : ''}
      
      <div className="checkout-page-buttons">
        <button onClick={goToPreviousStep}>Previous</button>
        <button onClick={confirmOrder} disabled={isConfirmingOrder}>{isConfirmingOrder ? 'Confirming...' : 'Confirm'}</button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
