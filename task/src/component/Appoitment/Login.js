// Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // CSS for form styling

// Utility to set a cookie
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

// Utility to store JWT token in localStorage
const storeToken = (token) => {
  localStorage.setItem('token', token);
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:3001/customer/login', {
        email,
        password,
      });

      const { token, customerId } = response.data;
      localStorage.setItem('token', token);
      document.cookie = `customerId=${customerId}; path=/`;

      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid email or password');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Google login clicked');
  };

  return (
    <div className="login-page">
      {/* Car-themed Background Elements */}
      <div className="car-bg">
        <div className="car-wheel"></div>
        <div className="car-wheel"></div>
        <div className="gear-icon"></div>
        <div className="gear-icon"></div>
        <div className="gear-icon"></div>
      </div>

      <div className="login-container">
        <div className="login-header">
          <div className="title-decoration">
            <span className="line"></span>
            <h2>Welcome Back</h2>
            <span className="line"></span>
          </div>
          <p>Sign in to your account</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>
          
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          
          <button type="submit" className="login-btn">Sign In</button>
        </form>
        
        <div className="divider">
          <span>or continue with</span>
        </div>
        
        <button onClick={handleGoogleLogin} className="google-btn">
          <img src="https://www.google.com/favicon.ico" alt="Google" />
          Sign in with Google
        </button>
        
        <div className="login-footer">
          <p className="register-link">
            Don't have an account? <Link to="/register" className="register-link-text">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
