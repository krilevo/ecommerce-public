import React, { useState } from 'react';
import './PaymentOptions.css';

const PaymentOptions = ({ options, selectedOption, setSelectedPaymentOption, goToPreviousStep, goToNextStep, confirmOrder }) => {
  const [error, setError] = useState('');

  const handleSelectPaymentOption = (option) => {
    setSelectedPaymentOption(option);
  }

  const checkIfStepCompleted = () => {
    if (selectedOption) {
      goToNextStep();
    } else {
      setError('Please select a payment method.')
    }
  };

  return (
    <div className="payment-options">
      <h3>Select Payment Option:</h3>
      <div className="payment-options-radio-group">
        {options.map((option, index) => (
          <label key={index} className="radio-label">
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleSelectPaymentOption(option)}
            />
            {option}
          </label>
        ))}
        <span className="checkout-page-error">{error}</span>
      </div>
      <div className="checkout-page-buttons">
        <button onClick={goToPreviousStep}>Previous</button>
        <button onClick={checkIfStepCompleted}>Next</button>
      </div>
    </div>
  );
};

export default PaymentOptions;
