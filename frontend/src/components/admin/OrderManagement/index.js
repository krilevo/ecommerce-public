import React, { useEffect, useState } from 'react';
import OrderTable from './OrderTable';
import OrderInfo from './OrderInfo';
import { fetchOrdersByStatus } from '../../../utils/services/api';
import './OrderManagement.css';

const OrderManagement = () => {
  const [selectedStatus, setStatus] = useState('pending');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    getOrders();
  }, [selectedStatus]);

  // Fetch orders by status
  const getOrders = () => {
    fetchOrdersByStatus(selectedStatus)
    .then((data) => {
      setOrders(data);
    })
    .catch((error) => {
      setOrders([]);
      console.log(error);
    });
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="order-management-container">
      <select className="order-management-status-selector" name="statuses" value={selectedStatus} onChange={handleStatusChange}>
        <option value="pending">Pending</option>
        <option value="processed">Processed</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="canceled">Canceled</option>
      </select>
      <span>{orders.length} Orders</span>
      {orders.length === 0 ? <div>No orders with status: {selectedStatus}</div> : <OrderTable orders={orders} setSelectedOrder={setSelectedOrder}/>}
      {selectedOrder ? <OrderInfo order={selectedOrder} updateTable={getOrders} onClose={() => setSelectedOrder(null)}/> : <></>}
    </div>
  );
};

export default OrderManagement;
