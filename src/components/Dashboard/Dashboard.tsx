/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashContainer">
        <Menu />
      </div>
    );
  }
}

export default Dashboard;
