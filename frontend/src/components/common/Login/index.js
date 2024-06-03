import React, { useState } from 'react';
import { useAuth } from '../../../utils/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await login(formData);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !formData.email || !formData.password || isLoading;

  return (
      <form className='login-form' onSubmit={handleLogin}>
        <label>Email</label>
        <input 
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />

        <p className="login-form-error">{errorMessage}</p>
        <button 
          type="submit"
          className={`login-form-btn ${isDisabled ? 'login-form-btn-disabled' : ''}`}
          disabled={isDisabled}
        >
          {isLoading ? 'Logging in...' : 'Login'}</button>
      </form>
  );
};

export default Login;