import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import About from './pages/About';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        
        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
        {/* Redirect root to dashboard, which will redirect to login if not authenticated */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Catch all other routes and redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App;
