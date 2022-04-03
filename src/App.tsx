import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeDaysInChart } from './components/accountActions';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import { getDaysInMonth } from './helpers/getDaysInMonth';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const daysArray = getDaysInMonth();
    dispatch(changeDaysInChart(daysArray));
  });

  return (
    <div className="App">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
