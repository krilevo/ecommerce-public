import React from 'react';
import './CheckoutProgressBar.css';

const CheckoutProgressBar = ({ steps, currentStep }) => {

  return (
    <div className="checkout-progress-bar">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`progress-step ${index <= currentStep ? 'active' : ''}`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default CheckoutProgressBar;
