import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import { getDaysInMonth } from './helpers/getDaysInMonth';

function App() {
  getDaysInMonth();
  return (
    <div className="App">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
