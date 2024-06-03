import React from 'react';
import Login from '../../components/common/Login';
import './LoginPage.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {

  return (
    <div className="login-page">
      <Login/>
      <Link className="login-page-link" to="/create-account">Create an account</Link>
    </div>
  );
};

export default LoginPage;