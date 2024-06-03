import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import SearchProducts from '../common/Search';
import CategoryNav from '../CategoryNav';
import { useCartContext } from '../../utils/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart, faUser, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const [categoryNavIsActive, setCategoryNavIsActive] = useState(false);
  const { totalQuantity } = useCartContext();

  const toggleCategoryNav = () => {
    setCategoryNavIsActive(!categoryNavIsActive);
  };

  return (
    <header className="header">
      <div className="header-section">
        <div className="logo">
          <Link to="/">
            <img src='/logo.png' alt='logo'/>
          </Link>
        </div>
        <button className="header-item" onClick={toggleCategoryNav}>
          <FontAwesomeIcon icon={faBars} />
          <span className="text">Categories</span>
        </button>
      </div>

      <div className="header-section">
        <SearchProducts></SearchProducts>
      </div>

      <div className="header-section">
        <Link className="header-item" to="/cart">
          {totalQuantity > 0 && <span className="header-cart-quantity">{totalQuantity}</span>}
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
        {user ? (
          <button className="header-item" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="text">Logout</span>
          </button>
        ) : (
          <Link className="header-item" to="/login">
            <FontAwesomeIcon icon={faUser} />
            <span className="text">Login</span>
          </Link>
        )}

        {user?.accessLevel === 'admin' && (
          <Link className="header-item" to="/admin">
            <FontAwesomeIcon icon={faCog} />
            <span className="text">Admin</span>
          </Link>
        )}
      </div>
      {categoryNavIsActive && <CategoryNav onClose={toggleCategoryNav} />}
    </header>
  );
};

export default Header;
