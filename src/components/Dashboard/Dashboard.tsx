import React from 'react';
import { useSelector } from 'react-redux';
import { TAccountOnList } from '../../types/types';
import Charts from '../Charts/Charts';
import Footer from '../Footer/Footer';
import Menu from '../Menu/Menu';
import Overview from '../Overview/Overview';
import TransactionsList from '../transactions/TransactionsList/TransactionsList';
import './Dashboard.css';

function Dashboard() {
  const { labelDays } = useSelector(({ account }: TAccountOnList) => ({
    labelDays: account.labelDays,
  }));

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
          {labelDays && <Charts />}
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
