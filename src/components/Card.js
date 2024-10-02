// src/components/Card.js
import React from 'react';
import '../styles.css';
import avatar from '../assets/avatar.png'; // Import the provided avatar image

const Card = ({
  ticket,
  userName,
  showUser,
  showStatus,
  showPriority,
  priorityIcons,
  statusIcons,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        {/* Display the Ticket ID */}
        <h4 className="card-id">{ticket.id}</h4>
        {/* Display the same Avatar for all users */}
        <img
          src={avatar}
          alt={userName}
          className={`user-avatar ${showUser ? '' : 'hide-avatar'}`}
        />
        {showUser && <span className="user-name">{userName}</span>}
      </div>
      {/* Display the Status if not grouped by status */}
      {showStatus && (
        <div className="card-status">
          <img
            src={statusIcons[ticket.status]}
            alt={`${ticket.status} icon`}
            className="status-icon"
          />
        </div>
      )}
      {/* Display the Ticket Title */}
      <h3 className="card-title">{ticket.title}</h3>
      {/* Display the Tag(s) */}
      <div className="card-footer">
        {/* Display the Priority if grouped by priority or user */}
        {showPriority && (
          <div className="priority-icon-container">
            <img
              src={priorityIcons[ticket.priority]}
              alt={`Priority ${ticket.priority}`}
              className="priority-icon"
            />
          </div>
        )}
        <div className="card-tag">
          <span>{ticket.tag.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
