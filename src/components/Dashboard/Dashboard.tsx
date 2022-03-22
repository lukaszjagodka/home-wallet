import React from 'react';
import Charts from '../Charts/Charts';
import Footer from '../Footer/Footer';
import Menu from '../Menu/Menu';
import Overview from '../Overview/Overview';
import TransactionsList from '../transactions/TransactionsList/TransactionsList';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-main">
      <div className="menu">
        <Menu />
      </div>
      <div>
        <div className="dash-container">
          <div className="overview">
            <Overview />
          </div>
          <div className="transaction-container">
            <TransactionsList />
          </div>
        </div>
        <div className="chart-container">
          <Charts />
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
