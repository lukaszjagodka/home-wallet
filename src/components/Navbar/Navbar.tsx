/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import AddTransaction from '../AddTransaction/AddTransaction';
import './Navbar.css';

const Navbar = function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('selectedAccount');
    window.location.href = '/';
  };

  return (
    <div className="container">
      <div className="navbarName">Home Wallet</div>
      <AddTransaction />
      <div className="logoutBtn">
        <button type="button" onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
