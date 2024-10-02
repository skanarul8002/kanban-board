// src/components/Header.js
import React, { useState, useEffect } from 'react';
import displayIcon from '../assets/Display.svg';
import downIcon from '../assets/down.svg';
import '../styles.css';

const Header = ({ onGroupChange, onOrderChange }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Handle clicks outside the modal to close it
  const handleClickOutside = (event) => {
    if (event.target.classList.contains('modal-overlay')) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    // Attach event listener for clicks outside modal
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="controls">
        <div className="display-button" onClick={toggleModal}>
          <img src={displayIcon} alt="Display Icon" className="icon" />
          <span>Display</span>
          <img src={downIcon} alt="Down Icon" className="down-icon" />
        </div>
        {showModal && (
          // Add overlay around modal for detecting outside clicks
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-content">
                {/* Grouping Section */}
                <div className="modal-item">
                  <span className="modal-label">Grouping</span>
                  <select onChange={(e) => onGroupChange(e.target.value)} className="select-box">
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
                    <option value="user">User</option>
                  </select>
                </div>

                {/* Ordering Section */}
                <div className="modal-item">
                  <span className="modal-label">Ordering</span>
                  <select onChange={(e) => onOrderChange(e.target.value)} className="select-box">
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
