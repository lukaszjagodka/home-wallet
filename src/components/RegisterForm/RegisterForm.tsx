import React, { useState } from 'react';
import './RegisterForm.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

type TProps = {
  openList: any,
}

const RegisterForm = function RegisterForm({ openList }: TProps) {
  const [isRegisterForm, setIsRegisterMenu] = useState(true);

  const handleClose = () => {
    setIsRegisterMenu(false);
    openList(false);
  };

  const handleAddAccount = () => {
    console.log('send to server');
  };

  return (
    <div className="registerContainer">
      {
        isRegisterForm ? (
          <div>
            <DialogTitle className="dialogTitle">Create account</DialogTitle>
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
              <TextField
                margin="dense"
                id="accountPassword"
                label="confirm password"
                variant="standard"
                fullWidth
              />
            </DialogContent>
            <DialogActions className="dialogActions" style={{ padding: '25px' }}>
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button variant="outlined" color="success" onClick={handleAddAccount}>Register</Button>
            </DialogActions>
          </div>
        ) : ''
      }
    </div>
  );
};

export default RegisterForm;
