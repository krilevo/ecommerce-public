import React from 'react';
import './Home.css';
import HeroBanner from '../../components/HeroBanner';
import ProductSlider from '../../components/common/ProductSlider';

const Home = () => {
  return (
    <div className="home">
      <HeroBanner/>
      <div className='product-slider-container'>
        <h2>Best Selling Products</h2>
        <ProductSlider criteria='best-selling'/>
      </div>
      <div className='product-slider-container'>
        <h2>Discounted Products</h2>
        <ProductSlider criteria='discounted'/>
      </div>
    </div>
  );
}

export default Home;
