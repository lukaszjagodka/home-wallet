/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Charts from '../Charts/Charts';
import Footer from '../Footer/Footer';
import Menu from '../Menu/Menu';
import Overview from '../Overview/Overview';
import TransactionsList from '../transactions/TransactionsList/TransactionsList';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboardMain">
        <div className="menu">
          <Menu />
        </div>
        <div>
          <div className="dashContainer">
            <div className="overview">
              <Overview />
            </div>
            <div className="transactionContainer">
              <TransactionsList />
            </div>
          </div>
          <div className="chartContainer">
            <Charts />
          </div>
        </div>
        <div className="footerContainer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
