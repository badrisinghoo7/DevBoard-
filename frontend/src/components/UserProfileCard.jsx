import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './UserProfileCard.css';

const UserProfileCard = () => {
  const { user, updateUserStatus } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(user?.statusMessage || '');
  const [showToast, setShowToast] = useState(false);
  const statusInputRef = useRef(null);
  const emailRef = useRef(null);
  
  if (!user) return null;

  const handleEditStatus = () => {
    setIsEditing(true);
    // Focus the input when Edit button is clicked (using useRef)
    setTimeout(() => {
      statusInputRef.current.focus();
    }, 0);
  };

  const handleSubmitStatus = (e) => {
    e.preventDefault();
    updateUserStatus(statusMessage);
    setIsEditing(false);
    
    // Show toast message
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(user.email);
    // Focus on email ref to give visual feedback
    emailRef.current.classList.add('highlight');
    setTimeout(() => {
      emailRef.current.classList.remove('highlight');
    }, 500);
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2>{user.name}</h2>
        <div className="company-badge" title={user.company.name}>
          {user.company.name}
        </div>
      </div>
      
      <div className="profile-info">
        <div className="info-row">
          <span>Email:</span>
          <span ref={emailRef} className="email">{user.email}</span>
          <button className="copy-button" onClick={copyEmail}>
            Copy
          </button>
        </div>
        
        <div className="info-row">
          <span>Username:</span>
          <span>@{user.username}</span>
        </div>
        
        <div className="info-row">
          <span>Website:</span>
          <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
            {user.website}
          </a>
        </div>
      </div>
      
      <div className="status-section">
        <h3>Developer Status</h3>
        
        {isEditing ? (
          <form onSubmit={handleSubmitStatus}>
            <input
              ref={statusInputRef}
              type="text"
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              placeholder="What's your current status?"
              maxLength={100}
            />
            <div className="button-group">
              <button type="submit" className="save-button">Save</button>
              <button 
                type="button" 
                className="cancel-button" 
                onClick={() => {
                  setIsEditing(false);
                  setStatusMessage(user.statusMessage);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="status-display">
            <p className="status-message">{user.statusMessage}</p>
            <button onClick={handleEditStatus} className="edit-button">
              Edit Status
            </button>
          </div>
        )}
      </div>
      
      {showToast && (
        <div className="toast-message">
          Status Updated Successfully!
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
