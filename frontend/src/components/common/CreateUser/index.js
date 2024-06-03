import React, { useState } from 'react';
import { useAuth } from '../../../utils/AuthContext';
import { createUser } from '../../../utils/services/api';
import { usePopup } from '../../../utils/PopupContext';
import './CreateUser.css';

const CreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { openPopup } = usePopup();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '', 
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Check if passwords match before proceeding
    if (formData.password !== formData.confirmPassword) {
      openPopup('Error', 'Passwords do not match');
      setIsLoading(false);
      return;
    }

    createUser(formData)
    .then((data) => {
      // Log the user in after creating an account
      const credentials = {
        email: data.email, 
        password: data.password
      }
      login(credentials);
    })
    .catch((error) => {
      console.log(error);
      openPopup('Error', error.message)
    })
    .finally(() => {
      setIsLoading(false);
    })
  };

  return (
    <form className='create-user-form' onSubmit={handleSubmit}>
      <div className="create-user-form-section">
        <label>First Name</label>
        <input 
          type='text'
          name='firstName'
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      <div className="create-user-form-section">
        <label>Last Name</label>
        <input 
          type='text'
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <div className="create-user-form-section">
        <label>Email</label>
        <input 
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="create-user-form-section">
        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="create-user-form-section">
        <label>Write Password Again</label>
        <input
          type='password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <button 
      type="submit" 
      className='create-user-form-btn'
      disabled={
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        isLoading
      }
      >
        {isLoading ? 'Creating...' : 'Create user'}
      </button>
    </form>
  );
};

export default CreateUser;
