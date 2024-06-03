import React, { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        if (response.status === 404 || response.status === 401) {
          throw new Error('Incorrect email or password.');
        } else {
          throw new Error('Server error. Try again later.');
        }
      }
  
      const data = await response.json();
      const token = data;

      localStorage.setItem('token', token);
      setUser(jwt_decode(token));
      navigate('/');
    } catch (error) {
      // Handle network error
      if (error.message === 'Failed to fetch') {
        throw new Error('Server error. Try again later.');
      }
      // Rethrow other errors for handling
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  // Check if the user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      // Token does not exist
    return false;
    }

    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      
      if (decodedToken.exp < currentTime) {
        console.log('Token has expired', decodedToken.exp);

        alert('Session has expired, logging out.')
        localStorage.removeItem('token');
        return false;
      }

      setUser(decodedToken);
      return true;
    } catch (error) {
      console.error('Error decoding the user:', error);
      return false;
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
