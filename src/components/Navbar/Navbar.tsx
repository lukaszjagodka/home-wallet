import React, { useState } from 'react';
import AddTransaction from '../transactions/AddTransaction/AddTransaction';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-name">Home Wallet</div>
      <AddTransaction />
    </div>
  );
}

export default Navbar;
