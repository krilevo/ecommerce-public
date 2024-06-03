import React, { useState } from 'react';
import './DeliveryOptions.css';

const DeliveryOptions = ({ options, selectedOption, setSelectedDeliveryOption, goToPreviousStep, goToNextStep }) => {
  const [error, setError] = useState('');

  const handleSelectDeliveryOption = (option) => {
    setSelectedDeliveryOption(option);
  };

  const checkIfStepCompleted = () => {
    if (selectedOption) {
      goToNextStep();
    } else {
      setError('Please select a delivery option.')
    }
  };

  return (
    <div className="delivery-options">
      <h3>Select Delivery Option:</h3>
      <div className="delivery-options-radio-group">
        {options.map((option, index) => (
          <label key={index} className="radio-label">
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleSelectDeliveryOption(option)}
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

export default DeliveryOptions;
