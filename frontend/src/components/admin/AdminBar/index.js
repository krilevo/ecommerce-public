import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AdminBar.css';

const AdminBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
      <nav className={`admin-bar ${!isVisible ? 'admin-bar-hidden' : ''}`}>
        <ul className="admin-bar-list">
          <li><NavLink to="user-management">User management</NavLink></li>
          <li><NavLink to="product-management">Product management</NavLink></li>
          <li><NavLink to="add-category">Add category</NavLink></li>
          <li><NavLink to="delete-category">Delete category</NavLink></li>
          <li><NavLink to="add-product">Add product</NavLink></li>
          <li><NavLink to="order-management">Order management</NavLink></li>
        </ul>
        <button className="admin-bar-button" onClick={() => setIsVisible(!isVisible)}>{isVisible ? '<' : '>'}</button>
      </nav>
  );
};

export default AdminBar;