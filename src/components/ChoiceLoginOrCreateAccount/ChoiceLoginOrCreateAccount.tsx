/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import LoginForm from '../LoginForm/LoginForm';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import './ChoiceLoginOrCreateAccount.css';

function ChoiceLoginOrCreateAccount() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(true);
  const [isOpenLoginForm, setIsOpenLoginForm] = useState<boolean>(false);
  const [isOpenRegisterForm, setIsOpenRegisterForm] = useState<boolean>(false);

  const handleLoginForm = () => {
    setIsOpenLoginForm(true);
  };

  const handleRegiserForm = () => {
    setIsOpenRegisterForm(true);
  };

  const handleOpenLoginForm = (e: any) => {
    setIsOpenLoginForm(e);
    window.location.href = '/';
  };

  const handleOpenRegisterForm = (e: any) => {
    setIsOpenRegisterForm(e);
  };

  return (
    <div>
      { isOpenLoginForm ? <LoginForm openList={handleOpenLoginForm} /> : ''}
      { isOpenRegisterForm ? <RegisterForm openList={handleOpenRegisterForm} /> : ''}
      { isOpenMenu ? (
        <div className="menuLoginOrRegister">
          <div className="appName">Home Wallet</div>
          {
            !isOpenLoginForm ? (
              <div className="choiceMenu">
                <div className="loginMenu">
                  <button className="btn" type="button" onClick={() => handleLoginForm()}>Login</button>
                </div>
                <div className="registerMenu">
                  <button className="btn" type="button" onClick={() => handleRegiserForm()}>Create account</button>
                </div>
              </div>
            ) : ''
          }
        </div>
      ) : ''}
    </div>
  );
}

export default ChoiceLoginOrCreateAccount;
