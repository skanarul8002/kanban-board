// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import './styles.css';

function App() {
  const [groupBy, setGroupBy] = useState('status');
  const [orderBy, setOrderBy] = useState('priority');

  return (
    <div className="App">
      <Header onGroupChange={setGroupBy} onOrderChange={setOrderBy} />
      <Board groupBy={groupBy} orderBy={orderBy} />
    </div>
  );
}

export default App;
