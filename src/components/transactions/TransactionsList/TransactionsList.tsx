import React, { useState } from 'react';
import './TransactionsList.css';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Transaction from '../Transaction/Transaction';

const TransactionsList = function TransactionsList() {
  const [checked, setChecked] = useState(false);
  const transArr: any[] = [];

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  setTimeout(() => {
    setChecked(true);
  }, 1000);

  return (
    <div className="transactionsList">
      <Collapse in={checked}>
        <div className="transactionsComponent">
          <Box sx={{ height: 35, backgroundColor: 'rgba(244, 245, 245, 0.835)' }}>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Show"
            />
          </Box>
          {
            transArr.forEach((transactionObj) => (
              <Transaction />
            ))
          }
          <Transaction />
          <Transaction />
          <Transaction />
        </div>
      </Collapse>
    </div>
  );
};

export default TransactionsList;
