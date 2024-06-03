import React, { useState } from 'react';
import countries from 'countries-list';
import './PersonalDetails.css';

const PersonalDetails = ({ formData, setFormData, goToPreviousStep, goToNextStep }) => {
  const { firstName, lastName, email, address, city, postalCode, country } = formData;
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const validateField = (name, value) => {
    let error = '';
    if (!value) {
      error = `Please provide your ${name}.`;
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {
      firstName: validateField('first name', firstName),
      lastName: validateField('last name', lastName),
      email: validateField('email', email),
      address: validateField('address', address),
      city: validateField('city', city),
      postalCode: validateField('postal code', postalCode),
      country: validateField('country', country)
    };

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const checkIfStepCompleted = () => {
    if (validateForm()) {
      goToNextStep();
    }
  };

  return (
    <div className="personal-details">
      <h2>Checkout</h2>
      <form className="personal-details-form">
        <div className="personal-details-form-section">
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            id="firstName"
            className="input"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <span className="checkout-page-error">{errors.firstName}</span>
        </div>

        <div className="personal-details-form-section">
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            className="input"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <span className="checkout-page-error">{errors.lastName}</span>
        </div>

        <div className="personal-details-form-section">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <span className="checkout-page-error">{errors.email}</span>
        </div>

        <div className="personal-details-form-section">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            className="input"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <span className="checkout-page-error">{errors.address}</span>
        </div>

        <div className="personal-details-form-section">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            className="input"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <span className="checkout-page-error">{errors.city}</span>
        </div>

        <div className="personal-details-form-section">
          <label htmlFor="postal-code">Postal Code:</label>
          <input
            type="text"
            id="postal-code"
            className="input"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
          <span className="checkout-page-error">{errors.postalCode}</span>
        </div>

        <div className="personal-details-form-section">
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            className="input"
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select a country</option>
              {Object.keys(countries.countries).map((code) => (
                <option key={code} value={code}>
                  {countries.countries[code].name}
                </option>
              ))}
            </select>
            <span className="checkout-page-error">{errors.country}</span>
          </div>
      </form>
      <div className="checkout-page-buttons">
        <button onClick={goToPreviousStep}>Previous</button>
        <button onClick={checkIfStepCompleted}>Next</button>
      </div>
    </div>
  );
};

export default PersonalDetails;
