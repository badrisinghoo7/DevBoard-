import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserProfileCard from '../components/UserProfileCard';
import ThemeToggle from '../components/ThemeToggle';
import './Dashboard.css';

const Dashboard = () => {
  const { user, loading, logout } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading-container">Loading your data...</div>;
  }

  if (error) {
    return <div className="error-container">Failed to load profile: {error}</div>;
  }

  if (!user) {
    return <div className="login-prompt">Please login to see your dashboard</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>DevBoard</h1>
        <div className="header-actions">
          <ThemeToggle />
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>
      
      <main className="dashboard-content">
        <UserProfileCard />
      </main>
      
      <footer className="dashboard-footer">
        <p>DevBoard &copy; 2025 - Your Developer Dashboard</p>
        <a href="/about">About</a>
      </footer>
    </div>
  );
};

export default Dashboard;
