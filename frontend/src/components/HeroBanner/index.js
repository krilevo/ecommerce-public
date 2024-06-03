import React from 'react';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="hero-background">
        <div className="hero-content">
          <h1>Welcome to Our Online Store</h1>
          <p>Discover the latest innovations in electronics and gadgets.</p>
          <a href="/category/electronics" className="cta-button">Shop Now</a>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
