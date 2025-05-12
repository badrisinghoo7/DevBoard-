import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setError('');
    
    try {
      const result = await login();
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error(error);
    } finally {
      setLoginLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-container">Checking authentication...</div>;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>DevBoard</h1>
          <p>Your Personal Developer Dashboard</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <button 
              type="submit" 
              className="login-button"
              disabled={loginLoading}
            >
              {loginLoading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="login-info">
            <p>
              This is a demo application. Click the login button to authenticate
              with a sample user profile.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
