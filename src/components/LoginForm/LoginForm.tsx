import React, { useState } from 'react';
import './LoginForm.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

type TProps = {
  openList: any,
}

const LoginForm = function LoginForm({ openList }: TProps) {
  const [isLoginForm, setIsOpenMenu] = useState(true);

  const handleClose = () => {
    setIsOpenMenu(false);
    openList(false);
  };

  const handleLogin = () => {
    console.log('send to server');
    openList(false);
    localStorage.setItem('selectedAccount', JSON.stringify('xxx'));
  };

  return (
    <div className="loginContainer">
      {
        isLoginForm ? (
          <div>
            <DialogTitle className="dialogTitle">Login</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="accountLogin"
                label="login"
                variant="standard"
                fullWidth
              />
              <TextField
                margin="dense"
                id="accountPassword"
                label="password"
                variant="standard"
                fullWidth
              />
            </DialogContent>
            <DialogActions className="dialogActions" style={{ padding: '25px' }}>
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button variant="outlined" color="success" onClick={handleLogin}>Login</Button>
            </DialogActions>
          </div>
        ) : ''
      }
    </div>
  );
};

export default LoginForm;
