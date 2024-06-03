import React from 'react';
import './OrderTable.css';

const OrderTable = ({ orders, setSelectedOrder }) => {
  return (
    <table className="order-management-table">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Order Date (mm/dd/yyyy)</th>
          <th>Shipping Address</th>
          <th>Payment Status</th>
          <th>Order Status</th>
          <th>Total Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order.firstName} {order.lastName}</td>
            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
            <td>{order.shippingAddress}</td>
            <td>{order.paymentStatus}</td>
            <td>{order.status}</td>
            <td>${order.totalOrderAmount}</td>
            <td><button className="order-management-table-btn" onClick={() => setSelectedOrder(order)}>Details</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
