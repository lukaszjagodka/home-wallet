import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './TransactionsList.css';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import TransactionItem from '../Transaction/TransactionItem';
import { TNewTransaction, TTransactionsOnList } from '../../../types/types';

const TransactionsList = function TransactionsList() {
  const transactions = useSelector((state: TTransactionsOnList) => state.transactions.transactions);
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    setTimeout(() => {
      setChecked(true);
    }, 500);
  });

  return (
    <div className="transactions-list">
      <Collapse in={checked}>
        <div className="transactions-component">
          <Box className="box-transactions-component">
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Show"
            />
          </Box>
          {transactions.map((transactionObj: TNewTransaction) => (
            <TransactionItem key={transactionObj.amount} params={transactionObj} />
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default TransactionsList;
