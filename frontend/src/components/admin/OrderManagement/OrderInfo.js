import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { updateOrder } from '../../../utils/services/api';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './OrderInfo.css';

const OrderInfo = ({ order, updateTable, onClose }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(order.status);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.order-management-order-info')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleStatusUpdate = (newStatus) => {
    setIsUpdating(true);

    const updatedOrder = { ...order, status: newStatus };

    updateOrder(order._id, updatedOrder)
    .then((response) => {
      setCurrentStatus(newStatus);
      setIsUpdating(false);
      updateTable();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
    {order ? <div className="order-management-order-info-bg"></div> : ''}
      <div className="order-management-order-info">
        <button className="order-management-order-info-back" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Order Information</h2>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> ${order.totalOrderAmount}</p>
        <p><strong>Delivery Method: </strong>{order.deliveryOption}</p>
        <p><strong>Payment Method: </strong>{order.paymentOption}</p>
        <p><strong>Payment Status: </strong>{order.paymentStatus}</p>
        <p><strong>Order Status: </strong>{currentStatus}</p>

        <h3>Shipping Address</h3>
        <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>City:</strong> {order.city}</p>
        <p><strong>Postal Code:</strong> {order.postalCode}</p>
        
        <h3>Ordered Products</h3>
        <ul>
          {order.products.map((product) => (
            <li key={product._id}>
              <p><strong>Product:</strong> <Link to={`/product/${product._id}/${product.name.replace(" ", "-")}`}> {product.name}</Link></p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>Price:</strong> ${product.price}</p>
            </li>
          ))}
        </ul>
        {isUpdating ? (
            <span>Updating...</span>
          ) : (
            <div className="order-management-order-info-buttons">
              <button className={`order-management-order-info-btn ${currentStatus === 'pending' ? 'order-management-order-info-btn-active' : ''}`} onClick={() => handleStatusUpdate('pending')}>Pending</button>
              <button className={`order-management-order-info-btn ${currentStatus === 'processed' ? 'order-management-order-info-btn-active' : ''}`} onClick={() => handleStatusUpdate('processed')}>Processed</button>
              <button className={`order-management-order-info-btn ${currentStatus === 'shipped' ? 'order-management-order-info-btn-active' : ''}`} onClick={() => handleStatusUpdate('shipped')}>Shipped</button>
              <button className={`order-management-order-info-btn ${currentStatus === 'delivered' ? 'order-management-order-info-btn-active' : ''}`} onClick={() => handleStatusUpdate('delivered')}>Delivered</button>
              <button className={`order-management-order-info-btn ${currentStatus === 'canceled' ? 'order-management-order-info-btn-active' : ''}`} onClick={() => handleStatusUpdate('canceled')}>Canceled</button>
            </div>
          )}
      </div>
    </>
  );
};

export default OrderInfo;
