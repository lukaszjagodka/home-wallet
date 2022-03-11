/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './ChoiceLoginOrCreateAccount.css';

function ChoiceLoginOrCreateAccount() {
  const [openMenu, setOpenMenu] = useState(true);
  return (
    <div>
      { openMenu ? (
        <div className="menuLoginOrRegister">
          <div className="appName">Home Wallet</div>
          <div className="choiceMenu">
            <div className="loginMenu">
              <button className="btn" type="button" onClick={() => setOpenMenu(false)}>Login</button>
            </div>
            <div className="registerMenu">
              <button className="btn" type="button" onClick={() => setOpenMenu(false)}>Create account</button>
            </div>
          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default ChoiceLoginOrCreateAccount;
