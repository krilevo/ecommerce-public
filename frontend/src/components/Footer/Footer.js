import React from 'react';
import { useLocation } from 'react-router';
import './Footer.css';

const Footer = () => {
  const { pathname } = useLocation();

  // Paths where the footer should not be displayed
  const hiddenPaths = ['/admin'];

  // Function to check if the current path should hide the footer
  const shouldHideFooter = (path) => hiddenPaths.some((hiddenPath) => path.startsWith(hiddenPath));

  return (
    !shouldHideFooter(pathname) && (
      <>
        <div className="footer-margin"/>
        <footer className="footer">
          <div>
            <div className='footer-services'>
              <p>Our Services</p>
              <ul>
                <li><a href='#'>Product Delivery</a></li>
                <li><a href='#'>Customer Support</a></li>
                <li><a href='#'>Refund Policy</a></li>
              </ul>
            </div>
            <div className='footer-social-media'>
              <p>Follow Us</p>
              <ul>
                <li><a href='#'>Facebook</a></li>
                <li><a href='#'>Twitter</a></li>
                <li><a href='#'>Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-copyright-container">
            <p>&copy; {new Date().getFullYear()} My Ecommerce Website. All rights reserved.</p>
          </div>
        </footer>
      </>
    )
  );
};

export default Footer;
