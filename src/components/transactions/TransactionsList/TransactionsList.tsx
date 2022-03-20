import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './TransactionsList.css';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Transaction from '../Transaction/Transaction';
import { TNewTransaction, TTransactionsOnList } from '../../../types/types';

const TransactionsList = function TransactionsList() {
  const transactions = useSelector((state: TTransactionsOnList) => state.transactions.transactions);
  const [checked, setChecked] = useState(false);

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
            transactions.map((transactionObj: TNewTransaction) => (
              <Transaction key={transactionObj.amount} params={transactionObj} />
            ))
          }
        </div>
      </Collapse>
    </div>
  );
};

export default TransactionsList;
