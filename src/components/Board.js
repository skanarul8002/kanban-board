// src/components/Board.js
import React, { useState, useEffect } from 'react';
import Card from './Card';
import addIcon from '../assets/add.svg';
import backlogIcon from '../assets/Backlog.svg';
import todoIcon from '../assets/To-do.svg';
import inProgressIcon from '../assets/in-progress.svg';
import doneIcon from '../assets/Done.svg';
import cancelledIcon from '../assets/Cancelled.svg';
import noPriorityIcon from '../assets/No-priority.svg';
import highPriorityIcon from '../assets/Img - High Priority.svg';
import mediumPriorityIcon from '../assets/Img - Medium Priority.svg';
import lowPriorityIcon from '../assets/Img - Low Priority.svg';
import urgentPriorityIcon from '../assets/SVG - Urgent Priority colour.svg';
import dotMenuIcon from '../assets/3 dot menu.svg';
import '../styles.css';

const Board = ({ groupBy, orderBy }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    // Fetch data from the provided API
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.tickets)) {
          setTickets(data.tickets);
          const userMap = data.users.reduce((acc, user) => {
            acc[user.id] = user.name;
            return acc;
          }, {});
          setUsers(userMap);
        } else {
          setTickets([]);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Map for grouping headers with icons
  const statusIcons = {
    Todo: todoIcon,
    'In progress': inProgressIcon,
    Done: doneIcon,
    Cancelled: cancelledIcon,
    Backlog: backlogIcon,
  };

  // Priority icons map
  const priorityIcons = {
    0: noPriorityIcon,
    1: urgentPriorityIcon,
    2: highPriorityIcon,
    3: mediumPriorityIcon,
    4: lowPriorityIcon,
  };

  // Function to group tickets by a specific field
  const groupByField = (field) => {
    if (!Array.isArray(tickets)) return {};
    return tickets.reduce((acc, ticket) => {
      const key = field === 'user' ? users[ticket.userId] : ticket[field] || 'Unassigned';
      if (!acc[key]) acc[key] = [];
      acc[key].push(ticket);
      return acc;
    }, {});
  };

  // Group tickets based on the selected grouping option
  const groupTickets = () => {
    switch (groupBy) {
      case 'status':
        return groupByField('status');
      case 'priority':
        return groupByField('priority');
      case 'user':
        return groupByField('user');
      default:
        return { 'All Tickets': tickets };
    }
  };

  // Sort tickets based on the ordering criteria
  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (orderBy === 'priority') return b.priority - a.priority;
      if (orderBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  };

  // Render grouped and sorted tickets
  const renderGroups = () => {
    const groupedTickets = groupTickets();
    return Object.keys(groupedTickets).map((group) => (
      <div key={group} className="column">
        <div className="column-header">
          <div className="column-left">
            {/* Use the status or priority icon for each group */}
            {groupBy === 'status' && (
              <img src={statusIcons[group]} alt={`${group} icon`} className="status-icon" />
            )}
            {groupBy === 'priority' && (
              <img src={priorityIcons[group]} alt={`${group} icon`} className="status-icon" />
            )}
            <h2 className="column-title">{group}</h2>
          </div>
          <div className="column-right">
            {/* Add the '+' symbol */}
            <img src={addIcon} alt="Add Card" className="add-icon" />
            {/* 3-dot menu icon for each column */}
            <img src={dotMenuIcon} alt="Menu" className="dot-menu-icon" />
          </div>
        </div>
        {/* Render the tickets within each group */}
        {sortTickets(groupedTickets[group]).map((ticket) => (
          <Card
            key={ticket.id}
            ticket={ticket}
            userName={users[ticket.userId]}
            showUser={groupBy === 'user'}
            showStatus={groupBy !== 'status'}
            showPriority={groupBy === 'priority' || groupBy === 'user'}
            priorityIcons={priorityIcons}
            statusIcons={statusIcons}
          />
        ))}
      </div>
    ));
  };

  return <div className="board">{renderGroups()}</div>;
};

export default Board;
